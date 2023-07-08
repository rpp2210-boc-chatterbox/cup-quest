import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Review } from './reviews/Review.jsx';
import ShopInformation from './shopInfo/ShopInformation';
/* eslint-disable react/prop-types */

export const ShopOverview = (props) => {
  const location = useLocation()

  const [ ratingsByDrink, setRatingsByDrink ] = useState({});

  const getAverages = () => {
    axios({
      method: 'GET',
      url: `/shops/menu-averages/${location.state.shopId}`
    })
      .then((averages) => {
        setRatingsByDrink(averages.data);
      })
      .catch((err) => {
        console.log('error getting averages', err);
      })
  }

  useEffect(() => {
    getAverages();
  }, [])

  return (
    <div className="overview_fullPage">
      <div className="overview_header">
        <Link to='/home'>
          <button className="button_back">Back</button>
        </Link>
        <Link to='/home'>
          <span className="logo_home--container">
          <img src="../logo-no-background.svg" alt="CupQuest Logo" className="logo logo_home"/>
          </span>
        </Link>
        <Link to='/'>
          <button className='button_logout'>Logout</button>
        </Link>
      </div>
      <ShopInformation shopId={location.state.shopId} userId={location.state.userId} ratingsByDrink={ratingsByDrink} />
      <Review shopId={location.state.shopId} userId={location.state.userId} getAverages={getAverages} />
    </div>
  )
}
