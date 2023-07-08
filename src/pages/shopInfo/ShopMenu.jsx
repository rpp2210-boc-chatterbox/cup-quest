/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MenuItem from './MenuItem.jsx';

const ShopMenu = ({ menu, avgRating, shopId, ratingsByDrink }) => {

  let key = 0;
  return (
    <div className="overview_menu">
      {menu.map((item) => {
        key++;
        if (ratingsByDrink[item] !== undefined) {
          var reviewedRating = ratingsByDrink[item].ratingSum / ratingsByDrink[item].count;
          return <MenuItem item={item} key={key} rating={reviewedRating}  />
        }
        return <MenuItem item={item} key={key} rating={avgRating} />
      })}
    </div>
  )
}

export default ShopMenu;