/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatSide from './ChatSide.jsx';
import ChatBody from './ChatBody.jsx';
import ChatFooter from './ChatFooter.jsx';

import requestHandler from '../lib/requestHandler.js';

const ChatMain = ({ socket }) => {
  const [currentChat, setCurrentChat] = useState('');
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState({});
  const location = useLocation();

  useEffect(() => {
    socket.emit('register', location.state.currentUser.name);

    socket.on('private_message', (data) => {
      var currentMessages;
      if (data.self) {
        if (!chats[data.to]) {
          chats[data.to] = [];
        }
        currentMessages = chats[data.to];
        currentMessages.push(data);
        setChats({...chats, [data.to]: currentMessages});
      } else {
        if (!chats[data.username]) {
          chats[data.username] = [];
        }
        currentMessages = chats[data.username];
        currentMessages.push(data);
        setChats({...chats, [data.username]: currentMessages});
      }
    });
  }, [socket]);

  useEffect(() => {
    requestHandler(`/user/${location.state.currentUser.name}/friends`, null, 'get', (response) => {
      setFriends(response.data);
    });
  }, [location.state.currentUser.name]);

  useEffect(() => {
    setCurrentChat(friends[0]);
  }, [friends]);

  return (
    <div className='chat'>
      <ChatSide socket={socket} friends={friends} currentUser={location.state.currentUser} setCurrentChat={setCurrentChat} />
      <div className='chat-main'>
        <ChatBody socket={socket} currentUser={location.state.currentUser} messages={chats[currentChat]} />
        <ChatFooter socket={socket} currentUser={location.state.currentUser} currentChat={currentChat} />
      </div>
    </div>
  )
}

export default ChatMain;