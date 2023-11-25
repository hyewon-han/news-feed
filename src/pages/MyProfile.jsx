import React from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import UserInfo from 'components/UserInfo';

function MyProfile() {
  return (
    <ProfileBox>
      <UserInfo>유저 정보,작성한 게시물</UserInfo>
    </ProfileBox>
  );
}

export default MyProfile;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.green};
  border: 1px solid ${theme.color.pink};
  margin: 20px auto 0 auto;
  width: 70%;
  height: 85%;
  min-width: 580px;
`;
