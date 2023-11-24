import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/default-user.jpeg';
import theme from 'styles/Theme';
import { auth, db } from 'firebase.js';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import Avatar from './Avatar';
import { useParams } from 'react-router-dom';

export default function UserCard({ user }) {
  // const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(null);
  const [mbti, setMbti] = useState('');

  const selectRef = useRef();
  const selectMbti = () => {
    setMbti(selectRef.current.value);
    return selectRef.current.value;
  };

  console.log(user.id);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userDoc = await getDoc(doc(db, 'users', userId));

  //       if (userDoc.exists()) {
  //         setUser(userDoc.data());
  //       } else {
  //         console.log('User data not found in Firestore');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error.message);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

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
  console.log(name, mbti, avatar);

  const updateUser = async () => {
    const usersRef = doc(db, 'users', user.id);
    await updateDoc(usersRef, {
      name,
      mbti,
      avatar
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
            <select id="mbti" onChange={selectMbti} ref={selectRef}>
              <option value="intj">INTJ</option>
              <option value="intp">INTP</option>
              <option value="entj">ENTJ</option>
              <option value="entp">ENTP</option>
              <option value="infj">INFJ</option>
              <option value="infp">INFP</option>
              <option value="enfj">ENFJ</option>
              <option value="enfp">ENFP</option>
              <option value="istj">ISTJ</option>
              <option value="isfj">ISFJ</option>
              <option value="estj">ESTJ</option>
              <option value="esfj">ESFJ</option>
              <option value="istp">ISTP</option>
              <option value="isfp">ISFP</option>
              <option value="estp">ESTP</option>
              <option value="esfp">ESFP</option>
            </select>
          ) : (
            <p>MBTI: {user?.mbti}</p>
          )}
          {isEditing ? <input name="file" type="file" accept="image/*" onChange={handleFileChange} /> : null}
        </NicknameAndData>
      </UserInfo>

      {isEditing ? (
        <>
          {' '}
          <EditProfile onClick={updateUser}>수정완료</EditProfile>
          <EditProfile onClick={() => setIsEditing(false)}>취소</EditProfile>
        </>
      ) : (
        <EditProfile onClick={() => setIsEditing(true)}>회원정보 수정</EditProfile>
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
