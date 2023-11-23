import Avatar from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import defaultThumb from 'assets/default-thumb.jpeg';
import theme from 'styles/Theme';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Detail() {
  // const feeds = useSelector((state) => state.feed);
  const { id } = useParams();
  // const feed = feeds.find((feed) => feed.feedId === id);
  const [userId, setUserId] = useState();
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'feeds'), where('feedId', '==', id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        setFeed(doc.data());
      });
    };
    fetchData();
  }, []);

  useEffect(() => {}, []);
  console.log(feed.userId);
  console.log(userId);
  // const users = useSelector((state) => state.user);
  // console.log(users);
  // const user = users.find((user) => user.userId === userId);
  // console.log(user);

  return (
    <Feed>
      <Header>
        <Avatar />
        <span>{feed.author}</span>
        <p>{feed.title}</p>
      </Header>

      <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
      <time>{feed.createAt}</time>
      <StDiv>{feed.userId === userId ? <button>삭제</button> : null}</StDiv>
      <StTextarea value={feed.content} disabled />
      <Avatar />
      {/* <span>{user?.name}</span>
      <span>{user?.mbti}</span> */}
      <form></form>
    </Feed>
  );
}

export default Detail;

const Feed = styled.div`
  background-color: whitesmoke;
  width: 700px;
  min-height: 500px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Thumbnail = styled.img`
  width: 95%;
  height: 300px;
  margin: 20px auto;
`;

const StTextarea = styled.textarea`
  background-color: ${theme.color.orange};
`;

const StDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
