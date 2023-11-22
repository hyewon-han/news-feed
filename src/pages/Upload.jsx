import { auth } from 'firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { createFeed } from 'redux/modules/feed';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const feedId = uuidv4();
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setUserId(user?.uid);
    });
  }, []);

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

  const createFeedObj = (e) => {
    e.preventDefault();
    const feedObj = {
      feedId,
      title,
      content,
      userId,
      createAt: formattedDate,
      thumbImg: image
    };
    // dispatch(createFeed(feedObj));
    // setTitle('');
    // setContent('');
    // navigate('/');
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
      <textarea
        name="content"
        type="text"
        placeholder="내용"
        value={content}
        onChange={handleInputChange}
        required
        maxLength={80}
      />
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
