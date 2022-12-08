import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_Y-BuatEn_60zZioRb-86wxjpWe0IdI8",
    authDomain: "todolist-85181.firebaseapp.com",
    projectId: "todolist-85181",
    storageBucket: "todolist-85181.appspot.com",
    messagingSenderId: "558994121248",
    appId: "1:558994121248:web:7ad8ebae26fda157179245"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);