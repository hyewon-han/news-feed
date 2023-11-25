import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import defaultThumb from 'assets/default-thumb.jpeg';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { snapshotFeeds } from 'redux/modules/feeds';
import { snapshotUsers } from 'redux/modules/users';

function Home() {
  const [feeds, setFeeds] = useState([]);
  // const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, 'users'));
  //     const querySnapshot = await getDocs(q);
  //     const initialUsers = [];
  //     querySnapshot.forEach((doc) => {
  //       // console.log(`${doc.id} => ${doc.data()}`);
  //       const data = {
  //         id: doc.id,
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

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, 'feeds'), (querySnapshot) => {
  //     const updatedFeeds = [];
  //     querySnapshot.forEach((doc) => {
  //       updatedFeeds.push({ id: doc.id, ...doc.data() });
  //     });
  //     console.log(updatedFeeds);
  //     dispatch(snapshotFeeds(updatedFeeds));
  //     setFeeds(updatedFeeds);
  //   });
  //   return () => unsubscribe(); // cleanup 함수로 리스너 해제(컴포 언마운트 될때!!)
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
  //     const updatedUsers = [];
  //     querySnapshot.forEach((doc) => {
  //       updatedUsers.push({ id: doc.id, ...doc.data() });
  //     });
  //     console.log(updatedUsers);
  //     dispatch(snapshotFeeds(updatedUsers));
  //     setUsers(updatedUsers);
  //   });
  //   return () => unsubscribe(); // cleanup 함수로 리스너 해제(컴포 언마운트 될때!!)
  // }, []);

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
        <StDiv>댓글 수{feed.comments?.length}</StDiv>
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
