import React, { useEffect, useState } from 'react';
import { auth, db, provider } from 'firebase.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { logInUser } from 'redux/modules/user';
import Button from 'components/Button';
import styled from 'styled-components';
import theme from 'styles/Theme';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUserId(user?.uid);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    setError(null); // 입력값이 변경될 때마다 오류 상태 초기화
  };

  useEffect(() => {
    const fetchData = async () => {
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
  console.log(user);
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      setEmail('');
      setPassword('');
      dispatch(logInUser(userCredential.user.uid));
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage);

      // 오류 메시지에 따라 다른 메시지 표시
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Login Successful:', user);
      dispatch(logInUser(user.uid));
      const userObj = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        userId: user.uid
      };
      const docRef = await addDoc(collection(db, 'users'), userObj);
      navigate('/');
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Google Login Error:', error.message);
    }
  };

  return (
    <Container>
      <StForm>
        <h1>Welcome to MBTI Community!😀</h1>
        <input id="email" type="email" value={email} name="email" onChange={onChange} required placeholder="email..." />

        <input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          required
          placeholder="password..."
        />

        <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>
        <Btns>
          <Button onClick={signIn}>로그인</Button>
          <Button onClick={handleGoogleLogin}>구글 로그인</Button>
        </Btns>
      </StForm>
    </Container>
  );
}

export default Login;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.form`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & h1 {
    font-size: ${theme.fontSize.xl};
    margin-bottom: 25px;
  }
  & input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: 1px solid ${theme.color.blue};
    }
  }
`;
