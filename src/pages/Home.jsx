import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from 'firebase.js';

function Home() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'), orderBy('createAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const initialFeeds = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialFeeds.push(data);
      });
      setFeeds(initialFeeds);
    };
    fetchData();
  }, []);

  return feeds.map((feed) => (
    <Link to={`/feeds/${feed.feedId}`} key={feed.feedId}>
      <FeedBox>
        <Feed>
          <Header>
            <Writer>
              <Avatar src={feed.authorImg} />
              <p>{feed.author}</p>
            </Writer>
            <span>{feed.title}</span>
          </Header>
          <FeedTime>{feed.createAt}</FeedTime>
          <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
          <Footer>
            <span>{feed.comments?.length}개의 댓글 ∙ </span>
            <span>❤️ {feed.like} </span>
          </Footer>
        </Feed>
      </FeedBox>
    </Link>
  ));
}

export default Home;

const FeedBox = styled.div`
  box-shadow: 0px 8px 16px 0px #00000033;
  width: 600px;
  min-height: 400px;
  margin: 20px;
  border-radius: 20px;
  justify-content: center;
  display: flex;
`;

const Feed = styled.div`
  width: 520px;
  margin: 20px 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const FeedTime = styled.time`
  text-align: right;
  padding: 10px 0px;
  color: rgba(0, 0, 0, 0.7);
  font-size: ${theme.fontSize.sm};
`;

const Header = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${theme.color.purple};
  color: white;
  & span {
    margin: auto;
    font-size: ${theme.fontSize.lg};
  }
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 200px;
  margin: 0px 0px 20px 12px;
  border-radius: 10px;
`;

const Footer = styled.div`
  text-align: right;
  font-size: ${theme.fontSize.base};
`;

const Writer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: ${theme.fontSize.lg};
  font-weight: 800;
  width: 28%;
  margin: 0px 10px;
`;
