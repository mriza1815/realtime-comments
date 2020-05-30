import { useEffect } from 'react';
import * as firebase from "firebase"
import {firebaseConfig} from "../firebase.config"

let googlePr
let facebookPr

const FirebaseLibrary = props => {

  useEffect(() => {initFirebase()}, [])

  const initFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      googlePr = new firebase.auth.GoogleAuthProvider();
      googlePr.addScope('https://www.googleapis.com/auth/contacts.readonly');
      
      facebookPr = new firebase.auth.FacebookAuthProvider();
      facebookPr.addScope('user_birthday');
    }
  }

  const makeEmailLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(resolve)
      .catch(reject);
    })
  }

  const makeSocialLogin = provider => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
      .then(resolve)
      .catch(reject);
    })
  }
  
  return {firebase, googlePr, facebookPr, makeEmailLogin, makeSocialLogin }
};

FirebaseLibrary.propTypes = {
  
};

export default FirebaseLibrary;