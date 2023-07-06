import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import path from 'path';
import * as https from 'node:https';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import { Server } from 'socket.io';

// import '../database/models.js';
// import { Review, User, Shop} from '../database/models.js';
import { User } from '../database/models/user.js'
import { Review } from '../database/models/review.js'
// EXPRESS ROUTES
import chat from './routes/chat.js';
import user from './routes/user.js';
import overview from './routes/overview.js';

// DATABASE
import '../database/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
})

app.get("/", function (req, res) {
  const url = "https://media.tenor.com/4iqJFHzJIDsAAAAC/cat-scream.gif";
  res.write(`
  <!DOCTYPE html>
  <h1> SERVER IS SET UP!!!!</h1>
  <img src="${url}"></img>
  </html>`)
  res.end();
})

// routes go here
app.use('/chat', chat);
app.use('/user', user);
app.use('/shops', overview);

app.post('/register', async function (req, res) {
  const { username, email, phone, picture } = req.body;

  try {
    const newUser = new User({
      name: username,
      email,
      phone,
      picture,
    });

    await newUser.save();
    res.status(200).send('User Created!')
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Err');
  }
})

app.post('/validate', async function (req, res) {
  const { username, email } = req.body;
  const existingUsername = await User.findOne({ name: username });

  if (existingUsername) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Check if the email is already in use
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  res.status(200).send();
});

app.post('/validateOnClick', async function (req, res) {
  const { email } = req.body;
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res.status(201).json({ message: 'Email already exists' });
  }

  res.status(200).send();
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~ DAVID C. NEEDS THIS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/userLogin/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log('------>', user)
    if (user) {
      let firstName = user.name.split(' ')[0];
      res.json({
        _id: user._id,
        email: user.email,
        name: firstName,
        picture: user.picture,
        bio: user.bio,
        friends: user.friends
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews/:id', (req, res) => {
  console.log('body: ', req.body);
  console.log('params: ', req.params);
  console.log('query: ', req.query)
  const shop = req.params.id ? req.params.id : 0;
  Review.find({shop: shop}).sort({createdAt: 'desc'})
  .then((results) => {
    res.status(200).send(results);
  })
})

app.post('/reviews', (req, res) => {
  const shop = req.body.shop;
  const userId = new mongoose.Types.ObjectId(req.body.userId);
  const rating = req.body.rating;
  const drink = req.body.drink;
  const comments = req.body.comments.length === 0 ? 'n/a' : req.body.comments;
  User.find({ _id: userId })
    .then((results) => {
      const picture = results[0].picture || 'https://cdn-icons-png.flaticon.com/512/847/847970.png?w=900&t=st=1687562010~exp=1687562610~hmac=e4506659b2805b2d2a3fce519290a0bd1ce6987de3562502be555b4b619c0d29';
      Review.create({ shop: shop, username: results[0].name, profilePic: picture, rating: rating, drink: drink, comments: comments })
    })
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  // Review.create({})
})

app.get('/map/:lat/:lng/:api', (req, res) => {
  const lat = req.params.lat;
  const lng = req.params.lng;
  const API = req.params.api;

  // console.log('lat,lng,auth===> ', lat, lng, API)

  fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&term=coffee&sort_by=best_match&limit=10`, {
    headers: {
      Authorization: API
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.businesses && data.businesses.length > 0) {
        res.status(200).json(data.businesses);
      } else {
        res.status(404).json({ message: 'No coffee shops found' });
      }
    })
    .catch(error => {
      console.log('Error fetching coffee shops:', error);
      res.status(500).json({ message: 'Error fetching coffee shops' });
    });
});


app.put('/reviews', (req, res) => {
  const reviewId = new mongoose.Types.ObjectId(req.body.reviewId);
  const add = req.body.add;
  const remove = req.body.remove;
  const addAmount = req.body.addAmount + 1;
  const removeAmount = req.body.removeAmount - 1;
  const query = {};
  if (typeof add === 'string') {
    query[add] = addAmount;
  }
  if (typeof remove === 'string') {
    query[remove] = removeAmount;
  }

  Review.updateOne({ _id: reviewId }, { $set: query })
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})
// app.get('/ratings', (req, res) => {
//   getDrinkRatings(req, res);
// });

// app.get('/shops/pictures/:id', (req, res) => {
//   getShopPictures(req, res);
// })

// eslint-disable-next-line no-undef
const port = process.env.PORT;
const server = http.createServer(app).listen(port, () => {
  console.log('listening on port', port);
  console.log(`Go to http://localhost:${port} for more details`)
});

const io = new Server(server);

const USER_LIST = {};

io.on('connection', (socket) => {
  socket.on('register', (username) => {
    socket.username = username;
    USER_LIST[username] = socket;
  });

  socket.on('private_message', (data) => {
    const to = data.to;
    const text = data.text;
    const timeStamp = data.timeStamp;
    const username = data.username;

    if (USER_LIST[to]) {
      USER_LIST[to].emit('private_message', {
        to, text, timeStamp, username, self: false
      });
      USER_LIST[username].emit('private_message', {
        to, text, timeStamp, username, self: true
      });
    }
  });

  socket.on('disconnect', (socket) => {
    console.log(`user disconnected ${socket.id}`);
  });
});