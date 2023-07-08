/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ChatMessage from './ChatMessage.jsx';

const ChatBody = ({ socket, messages }) => {
  return (
    <div className='chat-body'>
      {messages ? messages.map((message) => {
        return (
          <ChatMessage message={message} />
        )
      }) : null}
    </div>
  )
}

export default ChatBody;