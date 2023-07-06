# CupQuest
### By Chatterbox

## Overview
CupQuest is a mobile-based application that serves as a comprehensive guide for coffee lovers. It functions as a platform exclusively for coffee shops, allowing users to search for coffee shops in their area, read reviews, and connect with friends. The app combines data from the Google Maps API and the Yelp API to provide accurate and up-to-date information about coffee shops.

## Table of Contents
- [Features](#Features)
- [Usage](#Usage)
- [Installation](#Installation)
- [External APIs](#External-APIs)
- [Tech Stack](#Tech-Stack)
- [Further Development](#Further-Development)
- [Contributors](#Contributors)

## Features
* **User Account and Authentication**: CupQuest provides users with the ability to create their own accounts. The app utilizes Google Authentication to ensure secure and easy login for users. User information is stored in Firebase, ensuring data security.
* **Coffee Shop Search**: With the help of the <a href="https://developers.google.com/maps">Google Maps API</a> and the <a href="https://docs.developer.yelp.com/docs/fusion-intro">Yelp API</a>, CupQuest offers a powerful search feature that allows users to find coffee shops in their vicinity. User searches are based on location, though results can be filtered by drinks and ratings.
* **Coffee Shop Information and Reviews**: Once a coffee shop is selected, CupQuest gathers detailed information from Yelp, including hours, contact information, and photos. At the moment, the menu is standardized across all coffee shops with basic drinks available anywhere, but there is an option for Specialty drinks to submit reviews for more creative beverages. These menu items are displayed with their average rating from the submitted reviews. Users can also read reviews left by other users--their friends showing first. Users can react by liking or disliking individual reviews.
* **Friends and Chat**: CupQuest allows for connecting with friends and fellow coffee enthusiasts. Users can add and remove friends, see other users' review history, and message with friends. This feature encourages a sense of community and fosters engagement among users.

## Usage
To get started with CupQuest, follow these steps:
1. Navigate to [CUPQUEST DEPLOYED URL].
2. Make a new account, log into your existing account, or sign in with Google.
3. Grant the necessary location permissions to ensure accurate search results.
4. Explore the various features of searching for coffee shops, reading reviews, and connecting with friends.
5. Customize your profile, change your profile picture, and update your preferences.

## Installation
To continue development for CupQuest, follow these steps:
1. Fork the CupQuest repository from GitHub.
2. Create a new branch for your contribution.
3. Install dependencies using NPM package manager:
```
npm install
```
4. Create a .env file with the following keys, sourced from the the listed places:
* Google Maps Dev
```
VITE_MAP_API_KEY=<key>
```
* Yelp Dev
```
VITE_YELP_API_KEY=<key>
VITE_YELP_CLIENT_ID=<key>
```
* Your database
```
DATABASE=<your MongoDB connection string>
```
* The port you are running on
```
PORT=3000
```
* Firebase
```
VITE_FIREBASE_API=<key>
VITE_FIREBASE_AUTH_DOMAIN=<domain>
VITE_FIREBASE_PROJECT_ID=<project id>
VITE_FIREBASE_STORAGE_BUCKET=<storage bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<messaging sender ID>
VITE_FIREBASE_APP_ID=<app ID>
VITE_FIREBASE_MEASUREMENT=<measurement>
VITE_FIREBASE_STORAGE=<storage>
```
* Google authentication
```
VITE_GOOGLE_CLIENT_ID=<client ID>
```
5. Then build the app using the following script. This will run Vite in watch mode, so as you make changes it will recompile upon saving.
```
npm run build
```
6. Then in a separate terminal window run the following command. This will run the Node.js server with Nodemon, so it restarts upon changes.
```
npm run server
```
* **Note:** You will have to use your own database for development purposes, but should changes be accepted your portion will integrate with the proprietary one.

## External APIs
Data is sourced from two external APIs:
* Google Maps, through the google-maps-react package
* Yelp Fusion endpoints:
  * /businesses/search
  * /businesses/matches
  * /businesses/:id


## Tech Stack
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=323330)
![ReactJS](https://img.shields.io/badge/React-808080?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-808080?style=for-the-badge&logo=express&logoColor=00ff00)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-808080.svg?style=for-the-badge&logo=nodemon&logoColor=008000)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![React Testing Library](https://img.shields.io/badge/testing%20library-808080?style=for-the-badge&logo=testing-library&logoColor=#E33332)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## Further Development
Next steps for CupQuest will involve:
* Adding comment functionality to reviews
* Specified menu based on actual available items at coffee shops

## Contributors
- [Addie Lopshire-Bratt](https://github.com/addielb)
- [David Cardona](https://github.com/clothesTooLarge)
- [George Haltermann](https://github.com/Agoews)
- [Matt McIvor](https://github.com/matthewrmcivor)
- [Sarah Kay](https://github.com/ThePebbles)
- [Sean Wong](https://github.com/seanwong1)