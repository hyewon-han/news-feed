import React from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import theme from 'styles/Theme';

export default function UserCard({ User }) {
  return (
    <LetterWrapper>
      <UserInfo>
        <AvataFigure>
          <img src={User.profileImg ?? defaultUser} alt="아바타이미지" /> //없으면 디폴트 유저사진
        </AvataFigure>
        <NicknameAndData>
          <p>이름 :{User.userId}</p>
          {/* 인펏으로바꾸고 토글 에딧프로필 누르면 인펏 활성화 버튼도 수정완료 버튼으로  */}
          <p>메일주소 :{User.email}</p>
          <p>MBTI :{User.mbti}</p>
        </NicknameAndData>
      </UserInfo>
      <Content>{User.Content}Edit profile</Content>
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

const AvataFigure = styled.figure`
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

const Content = styled.button`
  border-radius: 12px;
  background-color: ${theme.color.pink};
  padding: 12px;
  margin-left: 390px;
  white-space: nowrap;
  cursor: pointer;
`;
