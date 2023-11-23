import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from 'redux/modules/user';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectRef = useRef();

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
    if (name === 'name') {
      setName(value);
    }
  };

  const selectMbti = () => {
    const selectedMbti = selectRef.current.value;
    return selectedMbti;
  };
  const createUserObj = async (userId) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        email,
        avatar: null,
        userId,
        mbti: selectMbti()
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    // const user = auth.currentUser;

    // if (user) {
    //   user.updateProfile({
    //     displayName: name
    //   });
    // }
    setName('');
    setPassword('');
    setEmail('');
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      console.log('user', userCredential.user);
      // const user = userCredential.user;
      // user.updateProfile({
      //   displayName: name
      // });
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
      <form onSubmit={signUp}>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <div>
          <label>이름 : </label>
          <input type="text" value={name} name="name" onChange={onChange} required></input>
        </div>
        <div>
          <label htmlFor="mbti">MBTI</label>
          <select id="mbti" onChange={selectMbti} ref={selectRef}>
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
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default Join;
