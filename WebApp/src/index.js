import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyCKRSrpvDr_XuhqL0tCwVvDU4w_ZUykCIU",
//   authDomain: "flooddetection-710f1.firebaseapp.com",
//   databaseURL: "https://flooddetection-710f1-default-rtdb.firebaseio.com",
//   projectId: "flooddetection-710f1",
//   storageBucket: "flooddetection-710f1.appspot.com",
//   messagingSenderId: "138122529101",
//   appId: "1:138122529101:web:931b97319247f61b790f04",
//   measurementId: "G-JNGM8CVJVR"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
