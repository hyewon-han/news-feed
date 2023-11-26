import React from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';

export default function ContentsCard({ feed }) {
  return (
    <LetterWrapper>
      <UserInfo>
        <NicknameAndData>
          <p>{feed.title}</p>
          <StyledImage src={feed.thumbImg ?? defaultThumb} alt="Feed Image" />
          <p>{feed.createAt}</p>
        </NicknameAndData>
      </UserInfo>
    </LetterWrapper>
  );
}

const StyledImage = styled.img`
  height: auto;
  width: 95%;
  height: 200px;
  border-radius: 10px;
  margin: 10px;
`;
const LetterWrapper = styled.li`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
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
  & p:first-child {
    font-size: ${theme.fontSize.lg};
    text-align: center;
  }
  & p:last-child {
    font-size: ${theme.fontSize.sm};
    text-align: right;
    margin-right: 10px;
  }
`;
