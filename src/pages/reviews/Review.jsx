import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReviewPost } from './ReviewPost.jsx';
import { ReviewList } from './ReviewList.jsx';
import { ReviewEntry } from './ReviewEntry.jsx';
/* eslint-disable react/prop-types */

export const Review = ({ shopId, userId, getAverages }) => {
  const [reviewList, setReviewList] = useState([]);
  const [reviewContent, setReviewContent] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [starting, setStarting] = useState(0);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    getReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId])

  const getReviews = () => {
    console.log('la shop: ', shopId);
    const options = {
      method: 'GET',
      url: `/reviews/${shopId}`,
    }
    axios(options)
      .then((results) => {
        setReviewContent(results.data);
        return results.data.map((review) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ReviewEntry getReviews={getReviews} toggle={toggle} setToggle={setToggle} likes={review.likes} dislikes={review.dislikes} reviewId={review._id} drink={review.drink} comments={review.comments} rating={review.rating} profilePic={review.profilePic} username={review.username}/>
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
    <div id='reviewsSection'>
      <ReviewPost getReviews={getReviews} filtered={filtered} setFiltered={setFiltered} shop={shopId} reviewList={reviewList} setReviewList={setReviewList} userId={userId} getAverages={getAverages}/>
      <ReviewList reviewList={reviewList}  filtered={filtered} setFiltered={setFiltered} setReviewList={setReviewList} reviewContent={reviewContent} setReviewContent={setReviewContent} starting={starting} setStarting={setStarting}/>
    </div>
  )
}