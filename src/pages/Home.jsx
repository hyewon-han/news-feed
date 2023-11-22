import React from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultUser from 'assets/default-user.jpeg';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';

function Home() {
  return (
    <Feed>
      <AvatarAndTitle>
        <Avatar />
        <p>게시글 제목</p>
      </AvatarAndTitle>
      <Thumbnail src={defaultThumb} alt="이미지없음" />
      <time>게시글 작성 시간</time>
      <StDiv>댓글 수 ( ) </StDiv>
    </Feed>
  );
}

export default Home;

const Feed = styled.div`
  background-color: ${theme.color.yellow};
  width: 500px;
  min-height: 300px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const AvatarAndTitle = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 200px;
  margin: 20px auto;
`;

const StDiv = styled.div`
  background-color: ${theme.color.orange};
`;
