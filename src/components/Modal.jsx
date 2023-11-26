import React from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // 모달 외부(Overlay)를 클릭하면 모달을 닫음
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <Overlay onClick={handleOverlayClick}>
      <Content>
        {/* <CloseButton onClick={onClose}>Close</CloseButton> */}
        {children}
      </Content>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   top: 10px;
//   right: 10px;
// `;
