/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ChatMessage from './ChatMessage.jsx';

const ChatBody = ({ socket, messages, currentUser }) => {
  return (
    <div className='chat-body'>
      {messages ? messages.map((message) => {
        return (
          <ChatMessage message={message} currentUser={currentUser} />
        )
      }) : null}
    </div>
  )
}

export default ChatBody;