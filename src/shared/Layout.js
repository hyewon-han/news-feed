import styled from 'styled-components';
import theme from 'styles/Theme';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import Avatar from 'components/Avatar';
import { useDispatch } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { logOutUser } from 'redux/modules/user';
import Button from 'components/Button';

function Layout({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setCurrentUser(user);
      setUserId(user?.uid);
    });
    document.addEventListener('click', () => setIsListVisible(false));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('userId', userId);
      const q = query(collection(db, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        setUser(doc.data());
      });
    };
    if (userId) fetchData();
  }, [userId]);

  const handleClickAvatar = (e) => {
    e.stopPropagation();
    setIsListVisible(!isListVisible);
  };
  const logOut = async (event) => {
    event.preventDefault();
    setIsListVisible(false);
    setUser('');
    dispatch(logOutUser());
    await signOut(auth);
    navigate('/');
  };
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>MBTI Community 👨‍👩‍👧‍👦</StSpan>
        </Link>
        <Btns>
          {currentUser ? (
            <User>
              <Avatar src={user?.avatar} onClick={handleClickAvatar} />
              <span>{user?.name}</span>
            </User>
          ) : (
            <>
              <Button color="yellow" onClick={() => navigate('/login')}>
                LOGIN
              </Button>
              <Button color="yellow" onClick={() => navigate('/join')}>
                JOIN
              </Button>
            </>
          )}
        </Btns>
        {isListVisible ? (
          <List>
            <Link to={`/users/${userId}`}>
              <li>My Profile</li>
            </Link>
            <Link to="upload">
              <li>Upload Feed</li>
            </Link>
            <li onClick={logOut}>Log out</li>
          </List>
        ) : null}
      </StHeader>
      <StLayout>{children}</StLayout>
      <StFooter>
        <span>Copyright &copy; MBTI Community All rights reserved</span>
      </StFooter>
    </div>
  );
}

export default Layout;

const StHeader = styled.header`
  background-color: ${theme.color.blue};
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 22px;
`;

const StFooter = styled.footer`
  background-color: ${theme.color.blue};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;

const Btns = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0px 20px;
`;

const StSpan = styled.span`
  margin: 0px 20px;
`;

const List = styled.ul`
  position: absolute;
  background-color: whitesmoke;
  color: black;
  right: 5%;
  top: 5%;
  border-radius: 10px;
  & li {
    margin: 5px 0px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    font-size: ${theme.fontSize.lg};
    &:hover {
      color: white;
      background-color: ${theme.color.pink};
    }
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0px;
`;
