import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HAPPY_EMOJI, NEUTRAL_EMOJI, SAD_EMOJI, emptyCommentList } from '../library/constants';
import Comment from "./Comment";
import {Link} from '../routes'

const CommentList = props => {

  const { comments, title } = props

  const renderHeader = () => (
    <div className="border-bottom border-gray w-100 px-2 d-flex align-items-center bg-white justify-content-between" style={{ height: 90 }} >
      <h2 className="text-dark mb-0 mx-4">{title}</h2>
      <span className="badge badge-pill badge-primary mx-4"
        style={{ fontSize: "1.2rem" }} >
        {comments.items.length}
      </span>
    </div>
  )

  const renderComments = () => (
    <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" 
      style={{ height: "calc(100vh - 300px)", overflowY: "scroll" }}>
      
      {comments.loading && <div className="loader" /> || (comments.items.length && comments.items.map((comment, index) => {
        const mood =
          comment.sentiment > 0
            ? HAPPY_EMOJI
            : comment.sentiment === 0
            ? NEUTRAL_EMOJI
            : SAD_EMOJI;

        return (
          <Fragment key={index}>
            <div className="d-flex justify-content-start align-items-center w-100 font-weight-bold text-dark mt-4 pb-1 px-1"
              style={{ fontSize: "0.9rem" }} >
              <span className="d-inline-block pr-1" style={{ fontSize: "1.25rem" }}>
                {String.fromCodePoint(...mood)}
              </span>
              <Link route='profile' params={{id: comment.uid}} className="align-middle" style={{ lineHeight: "1.25rem" }} >
                {comment.person || "Anonymous"}
              </Link>
            </div>
            <Comment text={comment.comment} />
          </Fragment>
        );
      })|| <span className="text-info mt-4">{emptyCommentList}</span>)}
    </div>
  )
  return (
    <Fragment>
      {renderHeader()}
      {renderComments()}
    </Fragment>
  );
};

CommentList.propTypes = {
  comments: PropTypes.object,
  title: PropTypes.string
};

CommentList.defaultProps = {
  comments: {loading: true, items: []},
  title: "Comments",
};

export default CommentList;