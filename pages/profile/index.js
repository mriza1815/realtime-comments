import React, { useState, useEffect, Fragment } from 'react';
import CommentList from '../../components/CommentList';
import Layout from '../../components/Layout';
import FirebaseLibrary from '../../library/firebase';

const Profile = props => {

  const {query} = props
  const userId = query.id
  const userData = localStorage && localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")) || null
  const [comments, setComments] = useState({loading: true, items: []})
  const [profileName, setProfileName] = useState(null)
  const { getUserComment } = FirebaseLibrary(props)

  useEffect(() => { fetchUserComments() }, [])

  const fetchUserComments = () => {
    getUserComment(userId).on('value', res => {
      let commentData = res.val() && Object.values(res.val()) || []
      setProfileName(commentData && commentData.length && commentData[0]["person"] || "Noname")
      setComments({loading: false, items: commentData})
    })
  }

  return (
    <Layout pageTitle="Realtime Comments">
      <main className="container-fluid position-absolute h-100 bg-white">
        <div className="row position-absolute w-100 h-100">
          <section className="align-content-start align-items-start bg-light d-flex flex-wrap h-100 position-relative px-0 w-100">
            <Fragment>
              <CommentList userData={userData} title={`${profileName} Profile`} comments={comments} />
            </Fragment>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Profile