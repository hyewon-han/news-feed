// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmosqjRa96TBY1SjzbtImvRGcxUnoJJWY',
  authDomain: 'news-feed-eb2c7.firebaseapp.com',
  projectId: 'news-feed-eb2c7',
  storageBucket: 'news-feed-eb2c7.appspot.com',
  messagingSenderId: '1030689171678',
  appId: '1:1030689171678:web:edd2f7837fd0bfeb59fa4f',
  measurementId: 'G-2KPP4SQ8G6'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
