/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import FriendElement from './FriendElement.jsx';

const ChatSide = ({ friends, setCurrentChat, currentChat }) => {
  return (
    <div className='chat-side'>
      <h1>Friends</h1>
        {friends.map((friend) => {
          return (
            <div className={currentChat === friend.name ? 'selected' : 'not-selected'} onClick={() => {
              setCurrentChat(friend.name);
            }}>{friend.name}</div>
          )
        })}
    </div>
  )
}

export default ChatSide;