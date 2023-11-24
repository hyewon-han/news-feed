import React from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import theme from 'styles/Theme';
import { Link } from 'react-router-dom';

export default function ContentsCard({ feed }) {
  return (
    <LetterWrapper>
      <UserInfo>
        <NicknameAndData>
          <p>{feed.title}</p>
          <StyledImage src={feed.thumbImg} alt="Feed Image" />

          <p>{feed.content}</p>
          <p>{feed.date1}</p>
        </NicknameAndData>
      </UserInfo>
    </LetterWrapper>
  );
}

const StyledImage = styled.img`
  max-width: 350px;
  height: auto;
`;
const LetterWrapper = styled.li`
  display: flex;
  gap: 12px;
  flex-direction: column;
  color: ${theme.color.blue};
  padding: 12px;
  border: 1px solid white;
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
