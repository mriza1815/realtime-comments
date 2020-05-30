import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import CommentList from '../../components/CommentList';
import Layout from '../../components/Layout';

const Profile = props => {

  const {query} = props
  const userId = query.id
  const [comments, setComments] = useState({loading: true, items: []})
  const [profileName, setProfileName] = useState(null)

  useEffect(() => { fetchUserComments() }, [])

  const fetchUserComments = () => {
    axios.post("/comments").then((response) => {
      const resData = response.data.comments && response.data.comments.filter(c => c.uid == userId)
      setProfileName(resData.length && resData[0]["person"] || null)
      setComments({loading: false, items: resData});
    });
  }

  return (
    <Layout pageTitle="Realtime Comments">
      <main className="container-fluid position-absolute h-100 bg-white">
        <div className="row position-absolute w-100 h-100">
          <section className="align-content-start align-items-start bg-light d-flex flex-wrap h-100 position-relative px-0 w-100">
            <Fragment>
              <CommentList title={`${profileName} Profile`} comments={comments} />
            </Fragment>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Profile