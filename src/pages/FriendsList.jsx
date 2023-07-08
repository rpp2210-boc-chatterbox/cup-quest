/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import FriendElement from './FriendElement.jsx';

import requestHandler from '../lib/requestHandler.js';

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);
  // TESTING
  // const [users, setUsers] = useState([]);
  const { name } = useParams();

  const location = useLocation();
  // console.log('Use Location Hook: ', location);
  // console.log('Use Location State: ', location.state.currentUser);

  useEffect(() => {
    requestHandler(`/user/${name}/friends`, null, 'get', (response) => {
      setFriends(response.data);
    });
  }, [name]);

  // useEffect(() => {
  //   requestHandler('/user/all', null, 'get', (response) => {
  //     setUsers(response.data);
  //   });
  // }, []);

  return (
    <div className="friends">
      <div className="overview_header">
        <Link to='/home'>
          <button className="button_back">Back</button>
        </Link>
        <Link to='/home'>
          <span className="logo_home--container">
          <img src="../../logo-no-background.svg" alt="CupQuest Logo" className="logo logo_home"/>
          </span>
        </Link>
        <Link to='/'>
          <button className='button_logout'>Logout</button>
        </Link>
      </div>
      <h1>Friends</h1>
        {friends.map((friend) => {
          return (
            <FriendElement friend={friend} currentUser={location.state.currentUser} />
          )
        })}
      {/* <h2>All Users</h2>
        {users.map((user) => {
          return (
            <FriendElement friend={user} currentUser={location.state.currentUser} />
          )
        })} */}
    </div>
  )
}

export default FriendsList;