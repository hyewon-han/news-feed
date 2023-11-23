import React from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import UserCard from './UserCard';
import ContentsCard from './ContentsCard';
import fakeData from 'fakeData.json';
import fakeData2 from 'fakeData2.json';

function UserInfo() {
  return (
    <>
      <ListWrapper>
        {fakeData.map((User) => (
          <UserCard User={User} />
        ))}
      </ListWrapper>
      <ListWrapper2>
        내가쓴 게시글 목록
        {fakeData2.map((feed) => (
          <ContentsCard feed={feed} />
        ))}
      </ListWrapper2>
    </>
  );
}

const ListWrapper = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  width: 500px;
  border-radius: 12px;
`;
const ListWrapper2 = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  width: 500px;
  border-radius: 12px;
  border: 2px solid ${theme.color.yellow};
`;
export default UserInfo;
