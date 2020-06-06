import { useEffect } from 'react';
import * as firebase from "firebase"
import {firebaseConfig} from "../firebase.config"

let googlePr
let facebookPr
let database
var commentListener

const FirebaseLibrary = props => {

  useEffect(() => {initFirebase()}, [])

  const initFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      googlePr = new firebase.auth.GoogleAuthProvider();
      googlePr.addScope('https://www.googleapis.com/auth/contacts.readonly');
      database = firebase.database()
      commentListener = database.ref('comments/');
      facebookPr = new firebase.auth.FacebookAuthProvider();
      facebookPr.addScope('user_birthday');
    }
  }

  const addComment = (userData,comment) => {
    database.ref(`comments/${userData.uid}/${comment.timestamp}`).set(comment)
  }

  const getUserComment = uid => database.ref('/comments/' + uid)

  const deleteComment = id => database.ref('/comments/' + id)

  const makeEmailLogin = (isLogin, name, email, password) => {
    return new Promise((resolve, reject) => {
      if(isLogin){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => resolve(res.user))
        .catch(reject);
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res =>{
          firebase.auth().onAuthStateChanged(user => {
            user.updateProfile({displayName: name}).then(() => resolve(user))
          })
        })
        .catch(reject);
      }
    })
  }

  const makeSocialLogin = provider => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
      .then(resolve)
      .catch(reject);
    })
  }
  
  return {firebase, googlePr, facebookPr, makeEmailLogin, makeSocialLogin, addComment, commentListener, getUserComment, deleteComment }
};

FirebaseLibrary.propTypes = {
  
};

export default FirebaseLibrary;