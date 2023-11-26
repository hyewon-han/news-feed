import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebase.js';

function Home() {
  const [feeds, setFeeds] = useState([]);
  // const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, 'users'));
  //     const querySnapshot = await getDocs(q);
  //     const initialUsers = [];
  //     querySnapshot.forEach((doc) => {
  //       // console.log(`${doc.id} => ${doc.data()}`);
  //       const data = {
  //         userId: doc.id,
  //         ...doc.data()
  //       };
  //       initialUsers.push(data);
  //     });
  //     setUsers(initialUsers);
  //   };
  //   fetchData();
  // }, []);

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

  return feeds.map((feed) => (
    <Link to={`/feeds/${feed.feedId}`} key={feed.feedId}>
      <FeedBox>
        <Feed>
          <AvatarAndTitle>
            <Avatar />
            <StP>
              <p>{feed.author}</p>
              <p>{feed.title}</p>
            </StP>
          </AvatarAndTitle>
          <FeedTime>{feed.createAt}</FeedTime>
          <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
          <StDiv>댓글 ( {feed.comments?.length} )</StDiv>
        <StDiv>좋아요 ( {feed.like} )</StDiv>
        </Feed>
      </FeedBox>
    </Link>
  ));
}

export default Home;

const FeedBox = styled.div`
  box-shadow: 0 5px 10px rgb(0 0 0 / 30%), 0 3px 16px rgb(0 0 0 / 30%);
  width: 600px;
  min-height: 500px;
  margin-top: 50px;
  border-radius: 10px;
  //background-color: ${theme.color.blue};
  justify-content: center;
  display: flex;
`

const Feed = styled.div`
  box-shadow: 0 5px 5px rgb(0 87 102 / 10%), 0 3px 5px rgb(0 0 0 / 10%);
  width: 520px;
  //min-height: 300px;
  margin: 20px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const StP = styled.div`
  flex-direction: column;
  padding-left: 10px;
  padding-top: 8px;
  color: white;
`

const FeedTime = styled.time`
  text-align: right;
  padding-right: 25px;
  padding-top: 10px;
  color: ${theme.color.gray};
`

const AvatarAndTitle = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  border-radius: 5px;
  background-color: ${theme.color.blue};
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 200px;
  margin: 0px 0px 20px 12px;
`;

const StDiv = styled.div`
  background-color: ${theme.color.blue};
  padding: 5px 0px 0px 5px;
  color: white
`;