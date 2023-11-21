// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA_W0Kd8-Quj8vGsbgQ5zcl7IIfm4YGjA',
  authDomain: 'sparta-816b8.firebaseapp.com',
  projectId: 'sparta-816b8',
  storageBucket: 'sparta-816b8.appspot.com',
  messagingSenderId: '838877346235',
  appId: '1:838877346235:web:5b4234b14a2a7aa3612c9e',
  measurementId: 'G-HK1NLBVX83'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
