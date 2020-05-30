import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {makeLogin, makeLogout} from '../../redux/auth/action';
import axios from 'axios';
import Layout from '../../components/Layout';
import CommentsWidget from '../../components/CommentsWidget';
import FirebaseLibrary from '../../library/firebase';
import {loginSuccessMsg, loginErrorMsg, prepareUserData} from '../../library/constants';
import { useToasts } from 'react-toast-notifications'
import FormModal from '../../components/Modal';

const Dashboard = props => {

  const [ post, setPost] = useState(null)
  const [ modal, setModal] = useState(false)
  const { addToast } = useToasts()
  const { makeLogin, user, query } = props
  
  const {googlePr, facebookPr, makeEmailLogin, makeSocialLogin } = FirebaseLibrary(props)
  const selectedTopic = query.topic || "sport"
  
  useEffect(() => { init() }, [])

  const init = () => {
    const userData = localStorage.getItem("userData") || null
    makeLogin(userData ? JSON.parse(userData) : null)
    axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
    .then(response => setPost(response.data));
  }

  const emailAuth = (email, password) => {
    setModal(false)
    makeEmailLogin(email, password)
    .then(res => {
      console.log("email", res)
      const mapUserData = prepareUserData(res)
      makeLogin(mapUserData)
      localStorage.setItem("userData", mapUserData)
      addToast(loginSuccessMsg, { appearance: 'success' })
    })
    .catch(e => { 
      console.log("catch", e.message) 
      addToast(e.message || loginErrorMsg, { appearance: 'error' })
    });
  }

  const socialAuth = provider => {
    makeSocialLogin(provider).then(result => {
      const mapUserData = prepareUserData(result)
      makeLogin(mapUserData)
      localStorage.setItem("userData", JSON.stringify(mapUserData))
      addToast(loginSuccessMsg, { appearance: 'success' })
    }).catch(e => {
      console.log("socialAuth error", e)
      addToast(e.code || e.message || loginErrorMsg, { appearance: 'error' })
    });
  }

  return (
    <Layout pageTitle="Realtime Comments">
      <main className="container-fluid position-absolute h-100 bg-white">
        <div className="row position-absolute w-100 h-100">
          <FormModal show={modal} onSave={emailAuth} handleClose={() => setModal(false)}/>
          <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">

            { post && <div className="position-relative h-100">

              <div className="px-5 mt-5 pt-5 mx-5">
                <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">HOMEPAGE</span>
                <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">{`Here is ${selectedTopic} topic`}</span>
              </div>
              
              <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
                <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>{ post }</span>
              </div>

            </div> }

          </section>

          <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0">
            { post && 
              <CommentsWidget googleLogin={() => socialAuth(googlePr)}
                selectedTopic={selectedTopic}
                userData={user}
                facebookLogin={() => socialAuth(facebookPr)}
                emailLogin={() => setModal(true)} 
              /> 
            }
          </section>

        </div>
      </main>
    </Layout>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  makeLogin, makeLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


