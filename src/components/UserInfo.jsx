import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import UserCard from './UserCard';
import ContentsCard from './ContentsCard';
import { db } from 'firebase.js';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userQuery = query(collection(db, 'users'), where('userId', '==', user));
          const userSnapshot = await getDocs(userQuery);
          if (userSnapshot.docs.length > 0) {
            const userData = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() };
            setUserData(userData);
          }
          const postsQuery = query(collection(db, 'feeds'), where('userId', '==', user));
          const postsSnapshot = await getDocs(postsQuery);
          const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserPosts(postsData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      {userData && <UserCard user={userData} />}
      <ListWrapper>
        <span>내가 작성한 게시글 ✍️</span>

        {userPosts.length !== 0 ? (
          userPosts.map((feed) => (
            <Link to={`/feeds/${feed.feedId}`} key={feed.feedId}>
              <ContentsCard feed={feed} />
            </Link>
          ))
        ) : (
          <span>아직 작성된 게시물이 없어요! 😅</span>
        )}
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  gap: 20px;
  padding: 12px;
  width: 500px;
  border-radius: 12px;
  background-color: whitesmoke;
  & span {
    font-size: ${theme.fontSize.xl};
    font-weight: 800;
  }
`;
export default UserInfo;
