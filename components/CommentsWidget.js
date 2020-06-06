import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { FacebookLoginButton, GoogleLoginButton, createButton } from "react-social-login-buttons";
import { socialEmailButtonConfig, socialLoginTitle, nameBadgeStyles } from "../library/constants";
import FirebaseLibrary from '../library/firebase';
import CommentList from "./CommentList";
import Sentiment from 'sentiment'

const EmailSocialButton = createButton(socialEmailButtonConfig)
const sentiment = new Sentiment();

const CommentsWidget = props => {
  const [comments, setComments] = useState({loading: true, items: []});
  const { facebookLogin, googleLogin, emailLogin, userData, selectedTopic } = props
  const { addComment, commentListener } = FirebaseLibrary(props)

  useEffect(() => {
    init();
  }, [selectedTopic, userData]);

  const init = () => {
    setComments(c => ({...c, loading: true}));
    commentListener.on("value", newCommentHere)
  };

  const newCommentHere = data => {
    const initData = (data && data.val()) ? Object.values(data.val()).reverse() : null
    const initComments = initData ? initData.reduce((sum, curr) => sum = [...sum, ...Object.values(curr).reverse()] , []) : []
    setComments({loading: false, items: initComments});
  }

  const handleKeyUp = (evt) => {
    const value = evt.target.value;
    if (evt.keyCode === 13 && !evt.shiftKey) {
      const sentimentScore = sentiment.analyze(value).score;
      const comment = { 
        person: userData.displayName,
        topic: selectedTopic,
        uid: userData.uid, 
        comment: value,
        sentiment: sentimentScore,
        timestamp: +new Date() 
      };
      evt.target.value = "";
      addComment(userData, comment)
    }
  };

  const renderSocialLoginButtons = () => (
    <div className="w-100 d-flex">
      <FacebookLoginButton text="Facebook" onClick={facebookLogin} />
      <GoogleLoginButton text="Google" onClick={googleLogin} />
      <EmailSocialButton onClick={emailLogin} />
    </div>
  )

  const renderCommentArea = () => (
    <div className="border-top border-gray w-100 px-4 d-flex flex-wrap align-items-center align-content-center bg-light mb-2em"
      style={{ height: 160 }} >
      {!userData && (
        <span className="text-dark py-2" style={{ fontSize: "1.5rem", fontWeight: 500 }} >
          {socialLoginTitle}
        </span>
      )}
      <div className="w-100 py-2 pb-3 d-flex justify-content-start">
        {userData ? (
          <span className="d-block d-flex align-items-center text-center text-white bg-primary font-weight-bold py-2 px-4 mr-3"
            style={nameBadgeStyles} title={userData.name}>
            {userData.name}
          </span>
        ) : renderSocialLoginButtons()}
      </div>
      {userData && (
        <textarea
          className="form-control px-3 py-2"
          onKeyUp={handleKeyUp}
          placeholder="Make a comment"
          style={{ resize: "none" }}
        ></textarea>
      )}
    </div>
  )

  return (
    <div className="w-100">
      <CommentList userData={userData} comments={comments} />
      {renderCommentArea()}
    </div>
  );
};

CommentsWidget.propTypes = {
  googleLogin: PropTypes.func,
  facebookLogin: PropTypes.func,
  emailLogin: PropTypes.func
};

export default CommentsWidget;
