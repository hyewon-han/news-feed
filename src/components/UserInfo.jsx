import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/Theme';
import UserCard from './UserCard';
import ContentsCard from './ContentsCard';
import { auth, db } from 'firebase.js';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function UserInfo() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        setCurrentUser(user);

        if (user) {
          const userQuery = query(collection(db, 'users'), where('userId', '==', user.uid));
          const userSnapshot = await getDocs(userQuery);

          if (userSnapshot.docs.length > 0) {
            const userData = userSnapshot.docs[0].data();
            setUserData(userData);
          }

          const postsQuery = query(collection(db, 'feeds'), where('userId', '==', user.uid));
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

      <ListWrapper2>
        내가쓴 게시글 목록
        {userPosts.map((feed) => (
          <Link to={`/feeds/${feed.feedId}`}>
            <ContentsCard key={feed.id} feed={feed} />
          </Link>
        ))}
      </ListWrapper2>
    </>
  );
}

const ListWrapper = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  width: 500px;
  border-radius: 12px;
`;
const ListWrapper2 = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  width: 500px;
  border-radius: 12px;
  border: 2px solid ${theme.color.yellow};
`;
export default UserInfo;
