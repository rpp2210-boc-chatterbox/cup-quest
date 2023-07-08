import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHistoryElement from './UserHistoryElement.jsx';
import requestHandler from './requestHandler.js';
import {ReviewEntry} from '../pages/reviews/ReviewEntry.jsx';
import { ReviewList } from '../pages/reviews/ReviewList.jsx';

const UserHistoryList = ({user}) => {
  const [reviewList, setReviewList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [reviewContent, setReviewContent] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [starting, setStarting] = useState(0);

  useEffect(() => {
    getReviews()
    // requestHandler(props.userID)
    // pass in userID to get all user history
  }, [user]);

  const getReviews = () => {
    const options = {
      method: 'GET',
      url: `/reviews/user/${user._id}`,
    }
    axios(options)
      .then((results) => {
        setReviewContent(results.data);
        return results.data.map((review) => {
          console.log('this', review)
          return (
            // eslint-disable-next-line react/jsx-key
            <UserHistoryElement getReviews={getReviews} toggle={toggle} setToggle={setToggle} likes={review.likes} dislikes={review.dislikes} reviewId={review._id} drink={review.drink} comments={review.comments} rating={review.rating} profilePic={user.picture} username={user.name}/>
          )
        })
      })
      .then((results) => {
        setFiltered(false);
        setReviewList(results);
      })
      .catch((err) => {
        console.log('error in getReviews: ', err);
      })
  }

  return (
    <div className='history-list'>
            <ReviewList reviewList={reviewList}  filtered={filtered} setFiltered={setFiltered} setReviewList={setReviewList} reviewContent={reviewContent} setReviewContent={setReviewContent} starting={starting} setStarting={setStarting}/>

    </div>
  );
};

export default UserHistoryList;