import React, { useState } from 'react';
import axios from 'axios';
/* eslint-disable react/prop-types */

export const ReviewPost = (props) => {
  const [rating, setRating] = useState(0);
  const [drink, setDrink] = useState('Drip Coffee');
  const [comments, setComments] = useState('');
  const isValid = () => {
    if (rating === 0) {
      //alert('Please rate your drink');
      document.getElementById('validation').innerHTML = 'Please Rate Your Drink';
      return false;
    } else {
      document.getElementById('validation').innerHTML = '';
      return true;
    }
  }
  const styleSettings = {
    'fontSize': '300%',
    'color': '#c97107'
  }

  const styling = {
    'color': 'red',
    'fontWeight': 'bolder'
  }
  const submitPost = (e) => {
    //wil need to send shop, user, rating, drink, comments,
    turnOff('star1');
    turnOff('star2');
    turnOff('star3');
    turnOff('star4');
    turnOff('star5');
    var valid = isValid();
    if (valid) {
      axios.post('/reviews', {
        shop: props.shop,
        userId: props.userId,
        rating: rating,
        drink: drink,
        comments: comments
      })
      .then(() => {
        props.getReviews()
        props.getAverages();
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }

  const turnOn = (id) => {
    if (document.getElementById(id).classList.contains('off')) {
      document.getElementById(id).classList.add('on');
      document.getElementById(id).classList.remove('off');
    }
    document.getElementById(id).innerHTML = '&#9733;';
  }

  const turnOff = (id) => {
    if (document.getElementById(id).classList.contains('on')) {
      document.getElementById(id).classList.add('off');
      document.getElementById(id).classList.remove('on');
    }
    document.getElementById(id).innerHTML = '&#9734;';
  }

  const star1 = () => {
    var condition1 = document.getElementById('star2').classList.contains('on');
    var condition2 = document.getElementById('star3').classList.contains('on');
    var condition3 = document.getElementById('star4').classList.contains('on');
    var condition4 = document.getElementById('star5').classList.contains('on');
    if (document.getElementById('star1').classList.contains('off')) {
      turnOn('star1');
    } else if (condition1 || condition2 || condition3 || condition4) {
      turnOff('star2');
      turnOff('star3');
      turnOff('star4');
      turnOff('star5');
    } else {
      turnOff('star1');
    }
    turnOff('star2');
    turnOff('star3');
    turnOff('star4');
    turnOff('star5');
    setRating(1);
  }

  const star2 = () => {
    var condition1 = document.getElementById('star3').classList.contains('on');
    var condition2 = document.getElementById('star4').classList.contains('on');
    var condition3 = document.getElementById('star5').classList.contains('on');
    if (document.getElementById('star2').classList.contains('off')) {
      turnOn('star1');
      turnOn('star2');
    } else if (condition1 || condition2 || condition3) {
      turnOff('star3');
      turnOff('star4');
      turnOff('star5');
    } else {
      turnOff('star1');
      turnOff('star2');
    }
    turnOff('star3');
    turnOff('star4');
    turnOff('star5');
    setRating(2);
  }

  const star3 = () => {
    var condition1 = document.getElementById('star4').classList.contains('on');
    var condition2 = document.getElementById('star5').classList.contains('on');
    if (document.getElementById('star3').classList.contains('off')) {
      turnOn('star1');
      turnOn('star2');
      turnOn('star3');
    } else if (condition1 || condition2) {
      turnOff('star4');
      turnOff('star5');
    } else {
      turnOff('star1');
      turnOff('star2');
      turnOff('star3');
    }
    turnOff('star4');
    turnOff('star5');
    setRating(3);
  }

  const star4 = () => {
    var condition1 = document.getElementById('star5').classList.contains('on');
    if (document.getElementById('star4').classList.contains('off')) {
      turnOn('star1');
      turnOn('star2');
      turnOn('star3');
      turnOn('star4');
    } else if (condition1) {
      turnOff('star5');
    } else {
      turnOff('star1');
      turnOff('star2');
      turnOff('star3');
      turnOff('star4');
    }
    turnOff('star5');
    setRating(4);
  }

  const star5 = () => {
    if (document.getElementById('star5').classList.contains('off')) {
      turnOn('star1');
      turnOn('star2');
      turnOn('star3');
      turnOn('star4');
      turnOn('star5');
    } else {
      turnOff('star1');
      turnOff('star2');
      turnOff('star3');
      turnOff('star4');
      turnOff('star5');
    }
    setRating(5);
  }
  return (
    <div id='reviewForm'>
      <div id='validation' style={styling}></div>
      <form className='postReview'>
        <label className='rate'>How would you rate
        <select id='postReviewDrinkOptions' required onChange={(e) => setDrink(e.target.value)}>
          <option className='drinkOptions' value='Drip Coffee'>Drip Coffee</option>
          <option className='drinkOptions' value='Pourover'>Pourover</option>
          <option className='drinkOptions' value='Cafe Au Lait'>Cafe Au Lait</option>
          <option className='drinkOptions' value='Latte'>Latte</option>
          <option className='drinkOptions' value='Flat White'>Flat White</option>
          <option className='drinkOptions' value='Mocha'>Mocha</option>
          <option className='drinkOptions' value='Cappuccino'>Cappuccino</option>
          <option className='drinkOptions' value='Espresso'>Espresso</option>
          <option className='drinkOptions' value='Macchiato'>Macchiato</option>
          <option className='drinkOptions' value='Cortado'>Cortado</option>
          <option className='drinkOptions' value='Americano'>Americano</option>
          <option className='drinkOptions' value='Cold Brew'>Cold Brew</option>
          <option className='drinkOptions' value='Iced Coffee'>Iced Coffee</option>
          <option className='drinkOptions' value='Hot Chocolate'>Hot Chocolate</option>
          <option className='drinkOptions' value='Specialty Drink'>Specialty Drink</option>
        </select>
         ?</label>
         <div className='starRating' required>
          <span id='star1' style={styleSettings} className='star1 off' onClick={() => star1()}>&#9734;</span>
          <span id='star2' style={styleSettings} className='star2 off' onClick={() => star2()}>&#9734;</span>
          <span id='star3' style={styleSettings} className='star3 off' onClick={() => star3()}>&#9734;</span>
          <span id='star4' style={styleSettings} className='star4 off' onClick={() => star4()}>&#9734;</span>
          <span id='star5' style={styleSettings} className='star5 off' onClick={() => star5()}>&#9734;</span>
         </div>
         <input id='comments' type='text' placeholder='Any additional thoughts?' onChange={() => setComments(document.getElementById('comments').value.replace(/[^\w\s!?.,']/gi, ''))}></input>
         <input id='postButton' type="reset" value="Post" onClick={(e) => submitPost(e)}/>
      </form>
    </div>
  )
}