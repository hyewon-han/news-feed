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
  const { id } = useParams();

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

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return (
    <Feed>
      <AvatarAndTitle>
        <Avatar />
        <p>{feed.title}</p>
      </AvatarAndTitle>
      <Thumbnail src={feed.thumbImg ?? defaultThumb} alt="이미지없음" />
      <time>{feed.createAt}</time>
      <StTextarea value={feed.content} />
      <Avatar />

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

const AvatarAndTitle = styled.header`
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
