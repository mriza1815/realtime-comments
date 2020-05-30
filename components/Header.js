import React, { useEffect } from 'react';
import {Router} from '../routes'
import {connect} from 'react-redux';
import {makeLogin, makeLogout} from '../redux/auth/action';
import {logoutSuccess} from '../library/constants';
import { useToasts } from 'react-toast-notifications'

const Header = props => {

  const {user, makeLogin, makeLogout} = props
  const { addToast } = useToasts()

  useEffect(() => { checkAuth() }, [])

  const checkAuth = () => {
    const userData = localStorage.getItem("userData") || null
    makeLogin(userData ? JSON.parse(userData) : null)
  }

  const logout = () => {
    makeLogout()
    localStorage.removeItem("userData")
    addToast(logoutSuccess, { appearance: 'success' })
    Router.pushRoute('home', {topic: 'sport'})
  }

  const goTopic = topic => Router.pushRoute('home', {topic})

  const renderTopicList = () => (
    <nav className="navbar navbar-expand-lg text-light ml-2">
      <ul className="navbar-nav mr-auto">
        <li onClick={() => goTopic("sport")} className="nav-item mr-3" style={{cursor: "pointer"}}>Sport Topic</li>
        <li onClick={() => goTopic("technology")} className="nav-item mr-3" style={{cursor: "pointer"}}>Technology Topic</li>
        <li onClick={() => goTopic("science")} className="nav-item" style={{cursor: "pointer"}}>Science Topic</li>
      </ul>
    </nav>
  )

  const renderDropMenu = () => (
    <div className="d-flex text-light align-items-center">
      <span>{`Welcome ${user.name}`}</span>
      <button onClick={logout} type="button" className="btn btn-labeled btn-default ml-3">
        <i className="fa fa-camera"></i>Logout
      </button>
    </div>
  )
  
  return (
    <div className="align-items-center bg-info d-flex justify-content-between p-3 position-fixed w-100" style={{height: 50, zIndex: 2}}>
      <div className="d-flex w-50 align-items-center">
        <span className="font-weight-bold text-dark">Realtime Comments</span>
        {renderTopicList()}
      </div>
      {user && renderDropMenu() || null}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  makeLogin, makeLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);