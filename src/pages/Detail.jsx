import Avatar from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import defaultThumb from 'assets/default-thumb.jpeg';
import theme from 'styles/Theme';
import { auth, db } from 'firebase.js';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import DeleteUpdate from 'components/DeleteUpdate';
import Button from 'components/Button';
import LikeFeed from 'components/LikeFeed';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';

function Detail() {
  const { id } = useParams();
  const [feed, setFeed] = useState('');
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const userId = useSelector((state) => state.user);
  const commentId = uuidv4();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
          const userSnapshot = await getDocs(userQuery);
          if (userSnapshot.docs.length > 0) {
            const userData = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() };
            setUser(userData);
          }
          const feedQuery = query(collection(db, 'feeds'), where('feedId', '==', id));
          const feedSnapshot = await getDocs(feedQuery);
          if (feedSnapshot.docs.length > 0) {
            const feedData = { id: feedSnapshot.docs[0].id, ...feedSnapshot.docs[0].data() };
            setFeed(feedData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchData();
  }, []);

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date());

  const createComment = async (e) => {
    e.preventDefault();
    const feedsRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedsRef, {
      comments: [
        ...feed.comments,
        {
          comment,
          writer: user.name,
          writerMbti: user.mbti,
          writerAvatar: user.avatar,
          writerId: user.userId,
          commentId,
          date: formattedDate
        }
      ]
    });
    window.location.reload();
  };

  const deleteComment = async (id) => {
    const feedsRef = doc(db, 'feeds', feed.id);
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result) {
      await updateDoc(feedsRef, {
        comments: feed.comments.filter((item) => item.commentId !== id)
      });
      window.location.reload();
    }
  };

  return (
    <Feed>
      <Header>
        <Writer>
          <Avatar src={feed.authorImg} />
          <span>{feed.author}</span>
        </Writer>
        <p>{feed.title}</p>
        <div>
          <LikeFeed feed={feed} />
        </div>
      </Header>
      <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
      <StSpan>{feed.createAt}</StSpan>
      <DeleteUpdate feed={feed} userId={userId} />
      <StTextarea value={feed.content} disabled />
      <div>
        {currentUser ? (
          <CommentForm>
            <Writer>
              <Avatar src={user?.avatar} />
              <div>
                <p>{user?.name}</p>
                <span>{user?.mbti}</span>
              </div>
            </Writer>

            <StForm onSubmit={createComment}>
              <StInput type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
              <Button color="yellow">댓글 작성</Button>
            </StForm>
          </CommentForm>
        ) : null}

        <div>
          {feed.comments?.map((item, idx) => (
            <CommentForm key={idx}>
              <Writer>
                <Avatar src={item.writerAvatar} />
                <div>
                  <p>{item.writer}</p>
                  <span>{item.writerMbti}</span>
                </div>
              </Writer>
              <CommentContent>
                <div>
                  <span>{item.comment}</span>
                  {item.writerId === user.userId ? (
                    <Button color="yellow" onClick={() => deleteComment(item.commentId)}>
                      삭제
                    </Button>
                  ) : null}
                </div>
                <p>{item.date}</p>
              </CommentContent>
            </CommentForm>
          ))}
        </div>
      </div>
    </Feed>
  );
}

export default Detail;

const Feed = styled.div`
  background-color: whitesmoke;
  width: 700px;
  min-height: 500px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSize.xl};
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 300px;
  margin: 20px auto;
  border-radius: 20px;
`;

const StTextarea = styled.textarea`
  background-color: white;
  width: 100%;
  min-height: 200px;
  resize: none;
  color: black;
  font-size: ${theme.fontSize.lg};
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const StSpan = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: ${theme.fontSize.base};
  color: rgba(0, 0, 0, 0.5);
  margin: 10px;
`;

const Writer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: ${theme.fontSize.lg};
  font-weight: 800;
  width: 22%;
  & div {
    display: flex;
    flex-direction: column;
    font-size: ${theme.fontSize.base};

    & span {
      color: ${theme.color.purple};
      font-size: ${theme.fontSize.lg};
    }
  }
`;

const CommentForm = styled.div`
  display: flex;

  gap: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0px;
`;

const StInput = styled.input`
  width: 80%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const StForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 80%;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  & div {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  & p {
    color: rgba(0, 0, 0, 0.7);
    font-size: ${theme.fontSize.sm};
    margin: 3px 0px;
  }
`;
