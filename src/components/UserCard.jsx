import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import theme from 'styles/Theme';
import { auth, db } from 'firebase.js';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

export default function UserCard({ user }) {
  // const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mbti, setMbti] = useState(user.mbti);

  console.log(user);
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

  useEffect(() => {
    console.log(auth?.currentUser?.uid);
  }, [auth]);

  const handleEditToggle = () => {
    // if (isEditing) {
    //   const userRef = doc(asdasd, asdasd, user.id);
    //   updateDoc(userRef, { ...user, mbti, email, name });
    // }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setName('name');
    }
    console.log(e.target.value);
  };

  return (
    <LetterWrapper>
      <UserInfo>
        <AvatarFigure>
          <img src={user?.profileImg ?? defaultUser} alt="Avatar image" />
        </AvatarFigure>
        <NicknameAndData>
          {isEditing ? <input type="text" value={name} onChange={handleInputChange} /> : <p>이름: {user?.name}</p>}
          {isEditing ? <input type="text" value={email} onChange={handleInputChange} /> : <p>이메일: {user?.email}</p>}
          {isEditing ? <input type="text" value={mbti} onChange={handleInputChange} /> : <p>MBTI: {user?.mbti}</p>}
        </NicknameAndData>
      </UserInfo>

      {isEditing ? (
        <EditProfile onClick={handleEditToggle}>수정완료</EditProfile>
      ) : (
        <EditProfile onClick={handleEditToggle}>EditProfile</EditProfile>
      )}

      <div style={{ display: isEditing ? 'none' : 'block' }}>{user?.mbti}</div>
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

const AvatarFigure = styled.figure`
  //figure태그안에는 이미 자식요소로 이미지 태그가있음
  width: 100px;
  height: 100px;
  border-radius: 50%; //높이넓이가같을때 보더 래디우스를 50%주면 동그래짐
  overflow: hidden; //이미지가 삐져나오면 숨겨줌
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; //이미지 크기가 피규어 크기만큼 꽉차게 빈틈없이만들어줌
    border-radius: 50%;
  }
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
