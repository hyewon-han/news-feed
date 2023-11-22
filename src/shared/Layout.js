import styled from 'styled-components';
import theme from 'styles/Theme';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebase.js';
import defaultUser from 'assets/default-img.jpeg';
import Avatar from 'components/Avatar';

function Layout({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // user 정보 없으면 null 표시
      setCurrentUser(user);
      currentUser ? setUserId(user.uid) : setUserId(null);
    });
  }, []);

  const onClick = (event) => {
    //event.stopPropagation();
    setIsListVisible(!isListVisible);
  };
  const logOut = async (event) => {
    event.preventDefault();
    setIsListVisible(false);
    await signOut(auth);
  };
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>MBTI Comunity</StSpan>
        </Link>
        <Btns>
          {currentUser ? (
            <Avatar onClick={onClick} />
          ) : (
            <>
              <button onClick={() => navigate('/login')}>LOGIN</button>
              <button onClick={() => navigate('/join')}>JOIN</button>
            </>
          )}
        </Btns>
        {isListVisible && (
          <List onClick={(e) => e.stopPropagation()}>
            <Link to={`/users/${userId}`}>
              <li>My Profile</li>
            </Link>
            <Link to="upload">
              <li>Upload Feed</li>
            </Link>
            <li onClick={logOut}>Log out</li>
          </List>
        )}
      </StHeader>
      <StLayout>{children}</StLayout>
      <StFooter>
        <span>Copyright &copy; MBTI Comunity All rights reserved</span>
      </StFooter>
    </div>
  );
}

export default Layout;

const StHeader = styled.header`
  background-color: ${theme.color.blue};
  width: 100%;
  height: 50px;
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
  width: 150px;
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
  padding: 10px;
  border-radius: 10px;
`;
