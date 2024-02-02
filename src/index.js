import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAnN-nIGYryOTafsBtiahwQNXbiU8yPBu8",
    authDomain: "led-ligths-682cc.firebaseapp.com",
    databaseURL: "https://led-ligths-682cc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "led-ligths-682cc",
    storageBucket: "led-ligths-682cc.appspot.com",
    messagingSenderId: "626969193906",
    appId: "1:626969193906:web:70283ab71e0475265ec8ab"
};
const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
