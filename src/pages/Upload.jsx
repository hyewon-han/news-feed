import { auth, db } from 'firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { createFeed } from 'redux/modules/feed';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import Button from 'components/Button';

function Upload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const feedId = uuidv4();
  const [userId, setUserId] = useState(null);
  const [thumbImg, setThumbImg] = useState(null);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(auth.currentUser.uid);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('userId', userId);
      const q = query(collection(db, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        setUser(doc.data());
      });
    };
    if (userId) fetchData();
  }, [userId]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleInputChange = (event) => {
    const {
      target: { value, name }
    } = event;
    if (name === 'title') setTitle(value);
    if (name === 'content') setContent(value);
  };
  console.log(title, content, thumbImg);

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

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date());

  const createFeedObj = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'feeds'), {
        feedId,
        title,
        content,
        userId,
        createAt: formattedDate,
        thumbImg,
        author: user.name,
        authorImg: user.avatar
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setTitle('');
    setContent('');
    navigate('/');
  };
  return (
    <StPost>
      <StH1>게시글 작성하기</StH1>
      <form onSubmit={createFeedObj}>
        <StTitle
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleInputChange}
          required
          maxLength={15}
        />
        <StContent
          name="content"
          type="text"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleInputChange}
          required
          maxLength={80}
        />
        <StFile name="file" type="file" accept="image/*" onChange={handleFileChange} />
        <Button size="large" color="yellow">
          업로드
        </Button>
      </form>
    </StPost>
  );
}

export default Upload;

const StPost = styled.div`
  background-color: inherit;
  width: 520px;
  height: 800px;
  text-align: center;
`;

const StH1 = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #475c7a;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const StTitle = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
`;

const StContent = styled.textarea`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
  resize: none;
`;

const StFile = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
  line-height: 50px;
  vertical-align: middle;
  cursor: pointer;
`;

const StBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: #475c7a;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  float: right;
  cursor: pointer;
`;
