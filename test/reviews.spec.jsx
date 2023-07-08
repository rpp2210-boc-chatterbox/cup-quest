import React from 'react';
import App from '../src/App';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { configure } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Review from './src/pages/reviews/Review.jsx';
import ReviewPost from '././src/pages/reviews/ReviewPost.jsx';
import ReviewEntry from './src/pages/reviews/ReviewEntry.jsx';
import Reactions from './src/pages/reviews/ReactionButtons.jsx';
import ReviewList from './src/pages/reviews/ReviewList.jsx';

configure({
  defaultHiddenn: true
});

afterEach(() => {
  cleanup();
})

describe('Review Section', () => {
  //it should send a get request (invoke a getReviews function with useEffect)
  //it should render a div with id of reviewsSection

})

describe('Post Review', () => {
  //it should render a div with the id of reviewForm
  //it should send a post request upon click of post button (invoke submitPost function)
  //it should fill in stars according to which star is clicked / active / inactive
  //it should only allow submission of valid froms (where star rating is chosen which means a star has been clicked on and is filled in)

})

describe('Review Entry', () => {

})

describe('Reaction Buttons', () => {

})

describe('Review List', () => {

})