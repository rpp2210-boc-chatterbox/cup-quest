import express from 'express';
const router = express.Router();
import { Review } from '../../database/models/review.js'
import { getUser, getAllUsers, addFriend, removeFriend, getFriends } from '../../database/controllers/user.js';

router.get('/all', async (req, res) => {
  return await getAllUsers()
    .then((result) => {
      if (result) {
        res.send(result);
      }
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.get('/:name', async (req, res) => {
  console.log(req.params);
  return await getUser(req.params)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send('User not found');
      }
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.get('/:name/friends', async (req, res) => {
  getFriends(req.params)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.send('User not found');
      }
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.put('/:name', async (req, res) => {
  var user_name = req.params;
  var friend_id = req.query._id;
  var friendship_state = Number(req.query.state);
  if (friendship_state === 1) {
    return await addFriend(user_name, friend_id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  } else if (friendship_state === 0) {
    return await removeFriend(user_name, friend_id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }
})

router.get('/:name/reviews', (req, res) => {
  const id = req.body._id === undefined ? 0 : req.body._id;
  Review.find({ user_id: id }).sort({ createdAt: 'desc' })
    .then((results) => {
      res.status(200).send(results);
    })
})

export default router;