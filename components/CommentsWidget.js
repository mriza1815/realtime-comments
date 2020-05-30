import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import PropTypes from 'prop-types'
import { FacebookLoginButton, GoogleLoginButton, createButton } from "react-social-login-buttons";
import { socialEmailButtonConfig, socialLoginTitle, nameBadgeStyles, HAPPY_EMOJI, NEUTRAL_EMOJI, SAD_EMOJI } from "../library/constants";
import CommentList from "./CommentList";

const EmailSocialButton = createButton(socialEmailButtonConfig)

const CommentsWidget = props => {
  const [comments, setComments] = useState({loading: true, items: []});
  const { facebookLogin, googleLogin, emailLogin, userData, selectedTopic } = props
  let channel;
  let pusher;

  useEffect(() => {
    init();
    return () => {
      pusher.disconnect();
    };
  }, [selectedTopic]);

  const init = () => {
    setComments(c => ({...c, loading: true}));
    pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    })

    channel = pusher.subscribe("post-comments");

    channel.bind("new-comment",setNewComment)

    pusher.connection.bind("connected", () => {
      axios.post("/comments").then((response) => {
        const initComments = response.data.comments.filter(c => c.topic === selectedTopic)
        setComments({loading: false, items: initComments});
      });
    });
  };
  
  const setNewComment = comment =>  comment && setComments(c => ({...c, items: [...c.items, comment.comment]}));

  const handleKeyUp = (evt) => {
    const value = evt.target.value;
    if (evt.keyCode === 13 && !evt.shiftKey) {
      const comment = { 
        person: userData.displayName,
        topic: selectedTopic,
        uid: userData.uid, 
        comment: value, 
        timestamp: +new Date() 
      };
      evt.target.value = "";
      axios.post("/comment", comment);
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
    <Fragment>
      <CommentList comments={comments} />
      {renderCommentArea()}
    </Fragment>
  );
};

CommentsWidget.propTypes = {
  googleLogin: PropTypes.func,
  facebookLogin: PropTypes.func,
  emailLogin: PropTypes.func
};

export default CommentsWidget;
