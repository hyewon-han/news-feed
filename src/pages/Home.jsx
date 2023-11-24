import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebase.js';

function Home() {
  const [feeds, setFeeds] = useState([]);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const initialUsers = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const data = {
          userId: doc.id,
          ...doc.data()
        };
        initialUsers.push(data);
      });
      setUsers(initialUsers);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'), orderBy('createAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const initialFeeds = [];
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
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
  console.log(feeds);
  // useEffect(() => {
  //   console.log(feeds);
  //   const result = feeds.forEach((feed) => users.find((user) => user.userId === feed.userId));
  //   console.log(result);
  // }, [feeds]);

  console.log(users);

  return feeds.map((feed) => (
    <Link to={`/feeds/${feed.feedId}`} key={feed.feedId}>
      <Feed>
        <AvatarAndTitle>
          <Avatar src={feed.authorImg} />
          <p>{feed.author}</p>
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
