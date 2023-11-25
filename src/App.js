import GlobalStyle from 'styles/GlobalStyle';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/Theme';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { snapshotFeeds } from 'redux/modules/feeds';
import { snapshotUsers } from 'redux/modules/users';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'feeds'), (querySnapshot) => {
      const updatedFeeds = [];
      querySnapshot.forEach((doc) => {
        updatedFeeds.push({ id: doc.id, ...doc.data() });
      });
      console.log(updatedFeeds);
      dispatch(snapshotFeeds(updatedFeeds));
    });
    return () => unsubscribe(); // cleanup 함수로 리스너 해제(컴포 언마운트 될때!!)
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const updatedUsers = [];
      querySnapshot.forEach((doc) => {
        updatedUsers.push({ id: doc.id, ...doc.data() });
      });
      console.log(updatedUsers);
      dispatch(snapshotUsers(updatedUsers));
    });
    return () => unsubscribe(); // cleanup 함수로 리스너 해제(컴포 언마운트 될때!!)
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
