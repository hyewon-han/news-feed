import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import { db } from 'firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import Avatar from './Avatar';

import Button from './Button';

export default function UserCard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(null);
  const [mbti, setMbti] = useState(null);

  const selectMbti = (e) => {
    setMbti(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader를 사용하여 이미지를 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUser = async () => {
    const usersRef = doc(db, 'users', user.id);
    await updateDoc(usersRef, {
      name,
      mbti: mbti ?? user.mbti,
      avatar: avatar ?? user.avatar
    });
    window.location.reload();
  };

  return (
    <LetterWrapper>
      <UserInfo>
        <Avatar src={user?.avatar} size="large" />
        <NicknameAndData>
          {isEditing ? (
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p>이름: {user?.name}</p>
          )}
          <p>이메일: {user?.email}</p>

          {isEditing ? (
            <select id="mbti" onChange={selectMbti}>
              <option value="" disabled>
                MBTI
              </option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </select>
          ) : (
            <p>MBTI: {user?.mbti}</p>
          )}
          {isEditing ? <input name="file" type="file" accept="image/*" onChange={handleFileChange} /> : null}
        </NicknameAndData>
      </UserInfo>

      {isEditing ? (
        <>
          <Btns>
            <Button onClick={updateUser}>수정완료</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </Btns>
        </>
      ) : (
        <Btns>
          <Button color="yellow" onClick={() => setIsEditing(true)}>
            회원정보 수정
          </Button>
        </Btns>
      )}
    </LetterWrapper>
  );
}

const LetterWrapper = styled.li`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 12px;
  border-radius: 12px;
`;
const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: center;
  & input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: 1px solid ${theme.color.blue};
    }
  }
  & select {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: 1px solid ${theme.color.blue};
    }
  }
`;

const NicknameAndData = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
