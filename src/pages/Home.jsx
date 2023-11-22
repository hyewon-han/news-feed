import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'firebase.js';

function Home() {
  // const feeds = useSelector((state) => state.feed);

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'));
      const querySnapshot = await getDocs(q);
      const initialFeeds = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        // setFeeds([doc.data()]);
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

  useEffect(() => {
    console.log(feeds);
  }, [feeds]);
  return feeds.map((feed) => (
    <Link to={`/feeds/${feed.feedId}`} key={feed.feedId}>
      <Feed>
        <AvatarAndTitle>
          <Avatar />
          <p>{feed.title}</p>
        </AvatarAndTitle>
        <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
        <time>{feed.createAt}</time>
        <StDiv>댓글 수 ( ) </StDiv>
      </Feed>
    </Link>
  ));
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
