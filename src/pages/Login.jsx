// import React, { useEffect, useState } from 'react';
// import { auth } from 'firebase.js';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       console.log('user', user); // user 정보 없으면 null 표시
//     });
//   }, []);

//   const onChange = (event) => {
//     const {
//       target: { name, value }
//     } = event;
//     if (name === 'email') {
//       setEmail(value);
//     }
//     if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const signIn = async (event) => {
//     event.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log('user with signIn', userCredential.user);
//       setEmail('');
//       setPassword('');
//       navigate('/');
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log('error with signIn', errorCode, errorMessage);
//     }
//   };

//   return (
//     <div>
//       <form>
//         <div>
//           <p>반갑습니다</p>
//           <p>MBTI community 입니다</p>
//           <input id="email" type="email" value={email} name="email" onChange={onChange} required></input>
//         </div>
//         <div>
//           <input type="password" value={password} name="password" onChange={onChange} required></input>
//         </div>
//         <p>여기에 오류 메시지를 표시해줘</p>
//         <button onClick={signIn}>로그인</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import { auth } from 'firebase.js';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
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

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage);

      // 오류 메시지에 따라 다른 메시지 표시
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <form>
        <div>
          <p>반갑습니다</p>
          <p>MBTI community 입니다</p>
          <input
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
            placeholder="email..."
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
            placeholder="password..."
          />
        </div>
        <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>
        <button onClick={signIn}>로그인</button>
      </form>
    </div>
  );
}

export default Login;
