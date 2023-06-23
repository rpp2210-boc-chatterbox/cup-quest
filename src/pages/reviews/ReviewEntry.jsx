import React, { useState } from 'react';
/* eslint-disable react/prop-types */

export const ReviewEntry = (props) => {
  const comment = () => {
    if (props.comments === 'n/a') {
      return (
        <h3 className='reviewsComment'></h3>
      )
    }
  }
  const drink = () => {
    return 'reviewed' + props.drink;
  }

  const rating = () => {
    if (props.rating === 1) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' style={styleSettings} >&#9733;</span>
          <span className='star2Entry' style={styleSettings} >&#9734;</span>
          <span className='star3Entry' style={styleSettings} >&#9734;</span>
          <span className='star4Entry' style={styleSettings} >&#9734;</span>
          <span className='star5Entry' style={styleSettings} >&#9734;</span>
        </div>
      )
    } else if (props.rating === 2) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' style={styleSettings} >&#9733;</span>
          <span className='star2Entry' style={styleSettings} >&#9733;</span>
          <span className='star3Entry' style={styleSettings} >&#9734;</span>
          <span className='star4Entry' style={styleSettings} >&#9734;</span>
          <span className='star5Entry' style={styleSettings} >&#9734;</span>
        </div>
      )
    } else if (props.rating === 3) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' style={styleSettings} >&#9733;</span>
          <span className='star2Entry' style={styleSettings} >&#9733;</span>
          <span className='star3Entry' style={styleSettings} >&#9733;</span>
          <span className='star4Entry' style={styleSettings} >&#9734;</span>
          <span className='star5Entry' style={styleSettings} >&#9734;</span>
        </div>
      )
    } else if (props.rating === 4) {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' style={styleSettings} >&#9733;</span>
          <span className='star2Entry' style={styleSettings} >&#9733;</span>
          <span className='star3Entry' style={styleSettings} >&#9733;</span>
          <span className='star4Entry' style={styleSettings} >&#9733;</span>
          <span className='star5Entry' style={styleSettings} >&#9734;</span>
        </div>
      )
    } else {
      return (
        <div className='reviewsRatingContainer'>
          <span className='star1Entry' style={styleSettings} >&#9733;</span>
          <span className='star2Entry' style={styleSettings} >&#9733;</span>
          <span className='star3Entry' style={styleSettings} >&#9733;</span>
          <span className='star4Entry' style={styleSettings} >&#9733;</span>
          <span className='star5Entry' style={styleSettings} >&#9733;</span>
        </div>
        )
    }
  }

  const styleSettings = {
    'fontSize': '300%',
    'color': 'yellow'
  }

  return (
    <div className='reviewsEntry'>
      <img className='reviewsPic' src={props.profilePic}></img>
      <h3 className='reviewsUsername'>{props.username}</h3>
      <h3 className='reviewsDrink'>{drink}</h3>
      {rating}
      {comment}
    </div>
  )
}