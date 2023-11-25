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

function Detail() {
  const { id } = useParams();
  const [feed, setFeed] = useState('');
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [feedData, setFeedData] = useState('');
  const userId = useSelector((state) => state.user);
  const commentId = uuidv4();

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
            setFeedData(feedData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   setFeed(feedData);
  // }, [feedData]);

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
          commentId
        }
      ]
    });
    window.location.reload();
  };

  const deleteComment = async (id) => {
    const feedsRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedsRef, {
      comments: feed.comments.filter((item) => item.commentId !== id)
    });
    window.location.reload();
  };
  return (
    <Feed>
      <Header>
        <p>{feed.id}</p>
        <Avatar src={feed.authorImg} />
        <span>{feed.author}</span>
        <p>{feed.title}</p>
      </Header>
      <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
      <time>{feed.createAt}</time>
      <LikeFeed feed={feed} />
      <DeleteUpdate feed={feed} userId={userId} />
      <StTextarea value={feed.content} disabled />
      <div>
        <Avatar src={user?.avatar} />
        <span>{user?.name}</span>
        <span>{user?.mbti}</span>
        <form onSubmit={createComment}>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button>댓글 작성</button>
        </form>
        <div>
          {feed.comments?.map((item, idx) => (
            <div key={idx}>
              <Avatar src={item.writerAvatar} />
              <span>{item.writer}</span>
              <span>{item.writerMbti}</span>
              <span>{item.comment}</span>
              {item.writerId === user.userId ? (
                <button onClick={() => deleteComment(item.commentId)}>삭제</button>
              ) : null}
            </div>
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
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 300px;
  margin: 20px auto;
`;

const StTextarea = styled.textarea`
  background-color: ${theme.color.orange};
  width: 100%;
  min-height: 200px;
  resize: none;
  color: black;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
