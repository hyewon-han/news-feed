import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { createUser } from 'redux/modules/user';
import { useNavigate } from 'react-router-dom';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Added passwordError state
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectRef = useRef();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  const selectMbti = () => {
    return selectRef.current.value;
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const createUserObj = (userId) => {
    const userObj = {
      name,
      email,
      avatar: null,
      userId,
      mbti: selectMbti()
    };
    dispatch(createUser(userObj));
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
      createUserObj(userId);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <form>
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
          <select id="mbti" onChange={selectMbti} ref={selectRef}>
            <option value="" disabled hidden>
              MBTI
            </option>
            <option value="intj">INTJ</option>
            <option value="intp">INTP</option>
            <option value="entj">ENTJ</option>
            <option value="entp">ENTP</option>
            <option value="infj">INFJ</option>
            <option value="infp">INFP</option>
            <option value="enfj">ENFJ</option>
            <option value="enfp">ENFP</option>
            <option value="istj">ISTJ</option>
            <option value="isfj">ISFJ</option>
            <option value="estj">ESTJ</option>
            <option value="esfj">ESFJ</option>
            <option value="istp">ISTP</option>
            <option value="isfp">ISFP</option>
            <option value="estp">ESTP</option>
            <option value="esfp">ESFP</option>
          </select>
        </div>
        <button onClick={signUp}>회원가입</button>
      </form>
    </div>
  );
}

export default Join;
