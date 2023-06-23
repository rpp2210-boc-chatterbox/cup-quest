/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ShopMenu from './ShopMenu.jsx';
import { shop } from './overview_mock';
import { menu } from '../../menu';
import latte1 from '../../assets/latte1.jpg';
import latte2 from '../../assets/latte2.jpg';
import latte3 from '../../assets/latte3.jpg';
import latte4 from '../../assets/latte4.jpg';

const ShopInformation = (/*{ shop  }*/) => {

  const parseDay = (dayAsNumber) => {
    var daysAsWords = {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday'
    };
    return daysAsWords[dayAsNumber];
  }
  const parseHours = (hourStr) => {
    var int24 = parseInt(hourStr);
    var tens = Math.floor(int24 / 100);
    if (tens - 12 >= 0) {
      return `${tens - 12}:${hourStr[2]}${hourStr[3]}PM`;
    } else {
      return `${tens}:${hourStr[2]}${hourStr[3]}AM`;
    }
  }

  return (
    <div className="overview_info">
      <div className="overview_pictures--container">
        <ol className="overview_picturesCarousel">
          <li>
            <img className="overview_pictures--pic" src={latte1}/>
          </li>
          <li>
          <img className="overview_pictures--pic" src={latte2}/>
          </li>
          <li>
            <img className="overview_pictures--pic" src={latte3}/>
          </li>
          <li>
          <img className="overview_pictures--pic" src={latte4}/>
          </li>
        </ol>
      </div>
      <h1 className="overview_title overview_title--scroll">{shop.name}</h1>
      <span className="overview_address">
        <div>
          {shop.address}
        </div>
        <div>
          {`${shop.city}, ${shop.state} ${shop.postal_code}`}
        </div>
      </span>
      <span className="overview_hours">
        {shop.hours[0].open.map((day) => {
          return (<div key={day.day}>
            {`${parseDay(day.day)}: ${parseHours(day.start)} to ${parseHours(day.end)}`}
          </div>)
        })}
      </span>
      <h3 className="overview_menu--title">Menu Items & Ratings</h3>
      <ShopMenu menu={menu} />
    </div>
  )
}

export default ShopInformation;
