import { auth, db } from 'firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { createFeed } from 'redux/modules/feed';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

function Upload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const feedId = uuidv4();
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setUserId(user?.uid);
    });
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
  // setUserId(auth.currentUser.uid);

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
  console.log(title, content, image);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader를 사용하여 이미지를 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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
        thumbImg: image,
        author: user.name
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    // const feedObj = {
    //   feedId,
    //   title,
    //   content,
    //   userId,
    //   createAt: formattedDate,
    //   thumbImg: image
    // };
    // dispatch(createFeed(feedObj));
    setTitle('');
    setContent('');
    navigate('/');
  };
  return (
    <StForm onSubmit={createFeedObj}>
      <input
        name="title"
        type="text"
        placeholder="제목"
        value={title}
        onChange={handleInputChange}
        required
        maxLength={15}
      />
      <textarea name="content" type="text" placeholder="내용" value={content} onChange={handleInputChange} required />
      <input name="file" type="file" accept="image/*" onChange={handleFileChange} />
      <button>업로드</button>
    </StForm>
  );
}

export default Upload;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;
