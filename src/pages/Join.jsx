import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { logInUser } from 'redux/modules/user';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Added passwordError state
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
    else if (name === 'name') setName(value);
    else if (name === 'mbti') setMbti(value);
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const createUser = async (userId) => {
    const userObj = {
      name,
      email,
      avatar: null,
      userId,
      mbti
    };
    try {
      const docRef = await addDoc(collection(db, 'users'), userObj);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    dispatch(logInUser(userId));
    setName('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUp = async (event) => {
    event.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.');
      return;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!validatePassword()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      console.log('user', userCredential.user);
      createUser(userId);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };
  return (
    <div>
      <form onSubmit={signUp}>
        <div>
          <h1>이메일 </h1>
          <input type="email" value={email} name="email" onChange={onChange} required />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <h1>비밀번호 </h1>
          <input type="password" value={password} name="password" onChange={onChange} required />
        </div>
        <div>
          <h1>비밀번호 재확인</h1>
          <input type="password" value={confirmPassword} name="confirmPassword" onChange={onChange} required />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <div>
          <h1>이름 </h1>
          <input type="text" value={name} name="name" onChange={onChange} required />
        </div>
        <div>
          <h1 htmlFor="mbti">MBTI</h1>
          <select id="mbti" onChange={onChange} name="mbti">
            <option value="" disabled>
              MBTI
            </option>
            <option value="INTJ">INTJ</option>
            <option value="INTP">INTP</option>
            <option value="ENTJ">ENTJ</option>
            <option value="ENTP">ENTP</option>
            <option value="INFJ">INFJ</option>
            <option value="INFP">INFP</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENFP">ENFP</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
          </select>
        </div>
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default Join;
