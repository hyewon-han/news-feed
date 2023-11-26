import React from 'react';
import styled from 'styled-components';
import UserInfo from 'components/UserInfo';
function MyProfile() {
  return (
    <ProfileBox>
      <UserInfo />
    </ProfileBox>
  );
}

export default MyProfile;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0 auto;
  width: 90%;
  height: 85%;
  min-width: 580px;
`;
