/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ChatMessage = ({ message }) => {
  const dateObject = new Date(message.timeStamp);
  const humanDateFormat = dateObject.toLocaleString();

  return (
    <div className='chat-message'>
      <div className='chat-message-username'>{message.username}</div>
      <div className='chat-message-message'>{message.text}</div>
      <div className='chat-message-timestamp'>{humanDateFormat}</div>
    </div>
  )
}

export default ChatMessage;