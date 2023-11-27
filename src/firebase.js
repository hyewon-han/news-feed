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
  apiKey: 'AIzaSyBFMv6kAjohiJW_DBDxaEDyj0pZ2nvA_e4',
  authDomain: 'sajochamchi-9d4df.firebaseapp.com',
  projectId: 'sajochamchi-9d4df',
  storageBucket: 'sajochamchi-9d4df.appspot.com',
  messagingSenderId: '216151407535',
  appId: '1:216151407535:web:2152ad1ea2af792c6a4d5a',
  measurementId: 'G-KC16MXH9ZV'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
