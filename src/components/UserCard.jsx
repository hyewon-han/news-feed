import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import theme from 'styles/Theme';
import { auth } from 'firebase.js';

export default function UserCard({ User }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(auth?.currentUser?.uid);
  }, [auth]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <LetterWrapper>
      <UserInfo>
        <AvatarFigure>
          <img src={User.profileImg ?? defaultUser} alt="Avatar image" />
        </AvatarFigure>
        <NicknameAndData>
          {isEditing ? (
            <input type="text" value={User.userId} onChange={(e) => console.log(e.target.value)} />
          ) : (
            <p>이름: {User.userId}</p>
          )}
          {isEditing ? (
            <input type="text" value={User.email} onChange={(e) => console.log(e.target.value)} />
          ) : (
            <p>이메일 주소: {User.email}</p>
          )}
          {isEditing ? (
            <input type="text" value={User.mbti} onChange={(e) => console.log(e.target.value)} />
          ) : (
            <p>MBTI: {User.mbti}</p>
          )}
        </NicknameAndData>
      </UserInfo>

      {isEditing ? <></> : <EditProfile onClick={handleEditToggle}>Edit profile</EditProfile>}
      {isEditing ? <EditProfile onClick={handleEditToggle}>수정완료 </EditProfile> : <></>}

      <div style={{ display: isEditing ? 'none' : 'block' }}>{User.mbti}</div>
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
