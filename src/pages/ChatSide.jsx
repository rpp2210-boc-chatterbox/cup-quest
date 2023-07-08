/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import FriendElement from './FriendElement.jsx';

const ChatSide = ({ friends, setCurrentChat }) => {
  return (
    <div className='chat-side'>
      <h1>Friends</h1>
        {friends.map((friend) => {
          return (
            <div onClick={() => {
              setCurrentChat(friend.name);
            }}>{friend.name}</div>
          )
        })}
    </div>
  )
}

export default ChatSide;