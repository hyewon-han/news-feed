import { db } from 'firebase.js';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './Modal';
import Button from './Button';
import theme from 'styles/Theme';

function DeleteUpdate({ feed, userId }) {
  const [title, setTitle] = useState(feed.title);
  const [content, setContent] = useState(feed.content);
  const [thumbImg, setThumbImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  const updateFeed = async () => {
    const feedsRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedsRef, {
      title: title ?? feed.title,
      content: content ?? feed.content,
      thumbImg: thumbImg ?? feed.thumbImg
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
  return (
    <StDiv>
      {feed.userId === userId ? (
        <>
          <Btns>
            <Button onClick={deleteFeed}>삭제</Button>
            <Button onClick={openModal}>수정</Button>
          </Btns>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Wrapper>
              <label htmlFor="title">제목</label>
              <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

              <label htmlFor="content">내용</label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />

              <label htmlFor="file">썸네일</label>
              <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
            </Wrapper>
            <Btns>
              <Button onClick={updateFeed}>수정완료</Button>
              <Button onClick={closeModal}>취소</Button>
            </Btns>
          </Modal>
        </>
      ) : null}
    </StDiv>
  );
}

export default DeleteUpdate;

const StDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btns = styled.div`
  display: flex;
  gap: 15px;
  margin: 15px;

  justify-content: center;
`;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 10px;
  font-size: ${theme.fontSize.base};
`;

const Textarea = styled.textarea`
  width: 97%;
  height: 100px;
  resize: none;
`;
