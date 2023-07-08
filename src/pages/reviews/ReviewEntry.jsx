import React, { useState } from 'react';
import { Reactions, Like, Dislike } from './ReactionButtons.jsx';
import ProfileLink from '../../lib/ProfileLink.jsx';
/* eslint-disable react/prop-types */

export const ReviewEntry = (props) => {
  // const [likes, setLikes] = useState(props.likes);
  // const [dislikes, setDislikes] = useState(props.dislikes);
  const drink = 'reviewed ' + props.drink;
  const rating = () => {
    if (props.rating === 1) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' >&#9733;</span>
          <span className='star2Entry' >&#9734;</span>
          <span className='star3Entry' >&#9734;</span>
          <span className='star4Entry' >&#9734;</span>
          <span className='star5Entry' >&#9734;</span>
        </div>
      )
    } else if (props.rating === 2) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' >&#9733;</span>
          <span className='star2Entry' >&#9733;</span>
          <span className='star3Entry' >&#9734;</span>
          <span className='star4Entry' >&#9734;</span>
          <span className='star5Entry' >&#9734;</span>
        </div>
      )
    } else if (props.rating === 3) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' >&#9733;</span>
          <span className='star2Entry' >&#9733;</span>
          <span className='star3Entry' >&#9733;</span>
          <span className='star4Entry' >&#9734;</span>
          <span className='star5Entry' >&#9734;</span>
        </div>
      )
    } else if (props.rating === 4) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' >&#9733;</span>
          <span className='star2Entry' >&#9733;</span>
          <span className='star3Entry' >&#9733;</span>
          <span className='star4Entry' >&#9733;</span>
          <span className='star5Entry' >&#9734;</span>
        </div>
      )
    } else {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' >&#9733;</span>
          <span className='star2Entry' >&#9733;</span>
          <span className='star3Entry' >&#9733;</span>
          <span className='star4Entry' >&#9733;</span>
          <span className='star5Entry' >&#9733;</span>
        </div>
        )
    }
  }

  const chooseComments = () => {
    if (props.comments === 'n/a') {
      return;
    } else {
      return (
        <h3 className='reviewsComment'>{props.comments}</h3>
      )
    }
  }

  return (
    <div className='reviewsEntry'>
      <div className='entryContainer'>
        {rating()}
        <img className='reviewsPic' src={props.profilePic}></img>
        <ProfileLink name={props.username} />
        {/* <h3 className='reviewsUsername'>{props.username}</h3> */}
        <h3 className='reviewsDrink'>{drink}</h3>
      </div>
      {chooseComments()}
      <div className='reactionButtons'>
        <Reactions getReviews={props.getReviews} toggle={props.toggle} setToggle={props.setToggle} reviewId={props.reviewId} likes={props.likes} dislikes={props.dislikes} />
      </div>
    </div>
  )
}