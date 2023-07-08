import axios from 'axios';
import { Shop } from '../../database/models/shop.js';
import { Review } from '../../database/models/review.js';
import 'dotenv/config';

import express from 'express';
const router = express.Router();


router.get('/:id', (req, res) => {
  // send request to yelp
  const options = {
    headers: {
      Authorization: process.env.VITE_YELP_API_KEY
    },
    url: `https://api.yelp.com/v3/businesses/${req.params.id}`,
    method: 'GET',
  }
  axios(options)
    .then((shopData) => {
      res.status(200).send(shopData.data);
    })
    .catch((err) => {
      console.log('error getting shop information from Yelp', err);
    })
})

router.get('/menu-averages/:id', (req, res) => {
  Review.find({ shop: req.params.id })
    .then((reviews) => {
      var allDrinks = {};
      if (reviews.length > 0) {
        reviews.forEach((review) => {
          if (allDrinks[review.drink] === undefined) {
            allDrinks[review.drink] = { ratingSum: review.rating, count: 1 } ;
          } else {
            allDrinks[review.drink].ratingSum += review.rating;
            allDrinks[review.drink].count++;
          }
        })
      }
      res.status(200).send(allDrinks);
    })
    .catch((err) => {
      console.log('error calculating average drink rating', err);
      res.status(404).send(err);
    })
});

// const getShopDetails = (req, res) => {
//   Shop.findOne({ business_id: req.body.id })
//     .then((shop) => {
//       var shopData = {
//         name: shop.name,
//         address: shop.address,
//         city: shop.city,
//         zip: shop.zip,
//         hours: shop.hours,
//         averageRating: shop.stars,
//       }
//       res.status(200).send(shopData);
//     })
//     .catch((err) => {
//       console.log(`error getting shop data for ${req.body.id}`, err);
//       res.status(404).send(err);
//     })
// }

// const getShopPictures = (req, res) => {
//   // send request to yelp
//   const options = {
//     headers: {
//       Authorization: process.env.VITE_YELP_API_KEY
//     },
//     url: `https://api.yelp.com/v3/businesses/${req.params.id}`,
//     method: 'GET',
//   }
//   axios(options)
//     .then((shopData) => {
//       res.status(200).send(shopData.data);
//     })
//     .catch((err) => {
//       console.log('error getting shop pictures from Yelp', err);
//     })
// }

export default router;