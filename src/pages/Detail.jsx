import Avatar from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import defaultThumb from 'assets/default-thumb.jpeg';
import theme from 'styles/Theme';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FaRegTrashAlt } from 'react-icons/fa';
import Modal from 'components/Modal';

function Detail() {
  const { id } = useParams();

  const [userId, setUserId] = useState();
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbImg, setThumbImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setUserId(user?.uid);
    });
  }, []);
  //console.log(auth?.currentUser?.uid);
  useEffect(() => {
    const fetchData = async () => {
      console.log('userId', userId);
      const q = query(collection(db, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data());
        setUser(doc.data());
      });
    };
    if (userId) fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'), where('feedId', '==', id));
      const querySnapshot = await getDocs(q);
      const initialFeed = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialFeed.push(data);
      });
      setFeed(...initialFeed);
    };
    fetchData();
  }, []);
  console.log(feed);

  const updateFeed = async () => {
    const feedsRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedsRef, {
      title,
      content,
      thumbImg
    });
    closeModal();
    window.location.reload();
  };

  const deleteFeed = async () => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result) {
      const feedsRef = doc(db, 'feeds', feed.id);
      await deleteDoc(feedsRef);
      navigate('/');
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader를 사용하여 이미지를 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //console.log(title, content, thumbImg);
  return (
    <Feed>
      <Header>
        <Avatar />
        <span>{feed.author}</span>
        <p>{feed.title}</p>
      </Header>

      <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />

      <time>{feed.createAt}</time>
      <StDiv>
        {feed.userId === userId ? (
          <>
            <button onClick={deleteFeed}>삭제</button>
            <button onClick={openModal}>수정</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div>
                <button onClick={updateFeed}>수정완료</button>
                <button onClick={closeModal}>취소</button>
              </div>
            </Modal>
          </>
        ) : null}
      </StDiv>

      <StTextarea value={feed.content} disabled />
      <Avatar />
      <span>{user?.name}</span>
      <span>{user?.mbti}</span>
      <form></form>
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
