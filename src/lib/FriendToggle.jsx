/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import requestHandler from './requestHandler.js';

const FriendToggle = ({ id, currentUser }) => {
  // TODO: ADD STATE TO CHANGE BUTTON TO ADD OR REMOVE FRIEND
  return (
    <div>
      <button className='add-remove-friend-button' onClick={() => {
      requestHandler(`/user/${currentUser.name}`, {_id: id, state: 1}, 'put', (response) => {
        console.log('adding', response);
      });
    }}>Add Friend</button>
    <button className='add-remove-friend-button' onClick={() => {
      requestHandler(`/user/${currentUser.name}`, {_id: id, state: 0}, 'put', (response) => {
        console.log('removing', response);
      });
    }}>Remove Friend</button>
    </div>
  );
};

export default FriendToggle;