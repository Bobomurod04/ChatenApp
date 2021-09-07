import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";


firebase.initializeApp({
  apiKey: "AIzaSyD2HqLATp63RWUmDTrPp0ndQceW47NT6Ws",
  authDomain: "bobchat-c696b.firebaseapp.com",
  projectId: "bobchat-c696b",
  storageBucket: "bobchat-c696b.appspot.com",
  messagingSenderId: "777100586204",
  appId: "1:777100586204:web:18ccfd3daa67c8c76ed819",
  measurementId: "G-ZMN3DG00KF"
});


export const Context = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider value={{ firestore, auth, firebase }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
