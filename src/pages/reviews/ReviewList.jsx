import React, { useState } from 'react';
/* eslint-disable react/prop-types */

export const ReviewList = (props) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const back = () => {
    if (props.starting !== 0) {
      return (
        <button id='reviewListBack' onClick={() => props.setStarting(props.starting - 2)}>&#8249;</button>
      )
    }
  }

  const next = () => {
    if (props.filtered) {
      if (props.starting + 2 < filteredReviews.length) {
        return (
          <button id='reviewListNext' onClick={() => props.setStarting(props.starting + 2)}>&#8250;</button>
        )
      }
    } else {
      if (props.starting + 2 < props.reviewList.length) {
        return (
          <button id='reviewListNext' onClick={() => props.setStarting(props.starting + 2)}>&#8250;</button>
        )
      }
    }
  }

  const filter = (e) => {
    const optionChosen = e.target.value;
    if (optionChosen === 'None') {
      props.setFiltered(false);
      setFilteredReviews([]);
      return;
    }
    const filteredDrinks = [];
    for (var i = 0; i < props.reviewContent.length; i++) {
      if (props.reviewContent[i].drink === e.target.value) {
        filteredDrinks.push(props.reviewList[i]);
      }
    }
    props.setFiltered(true);
    props.setStarting(0);
    setFilteredReviews(filteredDrinks);
  }

  const chooseReviews = () => {
    if (!props.filtered) {
      if (props.reviewList.length === 0) {
        return (
          <div className='noReviewsYet'>No Reviews Yet!</div>
        )
      } else {
        return (
          <div id='reviewList'>
            {props.reviewList[props.starting]}
            {props.reviewList[props.starting + 1]}
          </div>
        )
      }
    } else {
      if (filteredReviews.length === 0) {
        return (
          <div className='noReviewsYet'>No Reviews Yet!</div>
        )
      } else {
        return (
          <div id='reviewList'>
            {filteredReviews[props.starting]}
            {filteredReviews[props.starting + 1]}
          </div>
        )
      }
    }
  }
  return (
    <div id='reviewListContainer'>
      <div id='filterContainer'>
        <select id='filterReviews' onClick={(e) => {filter(e)}}>
          <option className='filterOptions' value='None'>None</option>
          <option className='filterOptions' value='Drip Coffee'>Drip Coffee</option>
          <option className='filterOptions' value='Pourover'>Pourover</option>
          <option className='filterOptions' value='Cafe Au Lait'>Cafe Au Lait</option>
          <option className='filterOptions' value='Latte'>Latte</option>
          <option className='filterOptions' value='Flat White'>Flat White</option>
          <option className='filterOptions' value='Mocha'>Mocha</option>
          <option className='filterOptions' value='Cappuccino'>Cappuccino</option>
          <option className='filterOptions' value='Espresso'>Espresso</option>
          <option className='filterOptions' value='Macchiato'>Macchiato</option>
          <option className='filterOptions' value='Cortado'>Cortado</option>
          <option className='filterOptions' value='Americano'>Americano</option>
          <option className='filterOptions' value='Cold Brew'>Cold Brew</option>
          <option className='filterOptions' value='Iced Coffee'>Iced Coffee</option>
          <option className='filterOptions' value='Hot Chocolate'>Hot Chocolate</option>
          <option className='filterOptions' value='Specialty Drink'>Specialty Drink</option>
        </select>
      </div>
      {chooseReviews()}
      <div className='arrowButtons'>
        {back()}
        {next()}
      </div>
    </div>
  )
}