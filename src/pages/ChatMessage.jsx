/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ChatMessage = ({ message, currentUser }) => {
  const dateObject = new Date(message.timeStamp);
  const humanDateFormat = dateObject.toLocaleString();

  return (
    <div className={currentUser.name === message.username ? 'talk-bubble tri-right btm-right own-message' : 'talk-bubble tri-right btm-left'}>
      <div className="talktext">
        <div className='chat-message-header'>
          <div className='chat-message-username'>{message.username}</div>
          <div className='chat-message-timestamp'>{humanDateFormat}</div>
        </div>
        <div className='chat-message-message'>{message.text}</div>
      </div>
    </div>
  )
}

export default ChatMessage;