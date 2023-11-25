import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import { auth, db } from 'firebase.js';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import Avatar from './Avatar';
import { useParams } from 'react-router-dom';
import Button from './Button';

export default function UserCard({ user }) {
  // const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(null);
  const [mbti, setMbti] = useState(null);

  // const selectRef = useRef();
  const selectMbti = (e) => {
    setMbti(e.target.value);
  };
  console.log(name, mbti);
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
  console.log(user);

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
          {/* {isEditing ? <input type="text" value={mbti} onChange={handleInputChange} /> : <p>MBTI: {user?.mbti}</p>} */}
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
  color: ${theme.color.blue};
  padding: 12px;

  border-radius: 12px;
`;
const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: center;
`;

const NicknameAndData = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const EditProfile = styled.button`
  border-radius: 12px;
  background-color: ${theme.color.pink};
  padding: 12px;
  margin-left: 390px;
  white-space: nowrap;
  cursor: pointer;
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
