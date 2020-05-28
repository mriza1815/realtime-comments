import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import CommentsWidget from '../../components/CommentsWidget';
import {Link} from '../../routes'
import * as firebase from "firebase"
import {firebaseConfig} from "../../firebase.config"

let googlePr
let facebookPr

const Dashboard = props => {

  const [post, setPost] = useState(null)
  const [googleProvider, setGoogleProvider] = useState(null)

  console.log("Welcome home page", props.url.query.topic)
  
  useEffect(() => { 
    initFirebase()
    init() 
  }, [])

  const initFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      googlePr = new firebase.auth.GoogleAuthProvider();
      googlePr.addScope('https://www.googleapis.com/auth/contacts.readonly');
      //setGoogleProvider(googlePr)
      
      facebookPr = new firebase.auth.FacebookAuthProvider();
      facebookPr.addScope('user_birthday');
    }
  }

  const init = () => {
    axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
    .then(response => setPost(response.data));
  }

  const emailAuth = () => {
    firebase.auth().createUserWithEmailAndPassword("steki632211@yahoo.com.tr", "mriza1815")
    .then(res => {
      if (res.user) Auth.setLoggedIn(true);
    })
    .catch(e => {
      console.log("catch", e.message)
    });
  }

  const socialAuth = provider => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("social", result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  return (
    <Layout pageTitle="Realtime Comments">
      <Link route='profile' params={{id: 'asasa'}}>
        <a>Profile gitme deneme</a>
      </Link>
      
      <button onClick={emailAuth}>Email auth</button>
      <button onClick={() => socialAuth(googlePr)}>Google auth</button>
      <button onClick={() => socialAuth(facebookPr)}>facebook auth</button>
      <main className="container-fluid position-absolute h-100 bg-white">
        <div className="row position-absolute w-100 h-100">

          <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">

            { post && <div className="position-relative h-100">

              <div className="px-5 mt-5 pt-5 mx-5">
                <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Editor's Pick</span>
                <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">Getting Started with Lorem Ipsum</span>
              </div>
              
              <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
                <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>{ post }</span>
              </div>

            </div> }

          </section>

          <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0">
            { post && <CommentsWidget /> }
          </section>

        </div>
      </main>
    </Layout>
  );
};

export default Dashboard
