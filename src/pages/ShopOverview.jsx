import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Review } from './reviews/Review.jsx';
import ShopInformation from './shopInfo/ShopInformation';
/* eslint-disable react/prop-types */

export const ShopOverview = (props) => {
  const [shop, setShop] = useState(0);
  return (
    <div>
      <h1>Shop Overview</h1>
      <Link to='/'>
        <button>Logout</button>
      </Link>
      <ShopInformation />
      <h1>Jquery is my nemesis</h1>
      <Review shop={shop} userId={props.userId}/>
    </div>
  )
}