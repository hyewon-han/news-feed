import { db } from 'firebase.js';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './Modal';
import Button from './Button';

function DeleteUpdate({ feed, userId }) {
  console.log(feed);
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
  return (
    <StDiv>
      {feed.userId === userId ? (
        <>
          <Button onClick={deleteFeed}>삭제</Button>
          <Button onClick={openModal}>수정</Button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div>
              <Button onClick={updateFeed}>수정완료</Button>
              <Button onClick={closeModal}>취소</Button>
            </div>
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
