/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import requestHandler from './requestHandler.js';

const FriendToggle = ({ id, currentUser }) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (id !== undefined && currentUser !== undefined) {
      requestHandler(`/user/${currentUser.name}/friend`, {id: id}, 'get', (response) => {
        if (response.data._id) {
          setIsFriend(true);
        } else {
          setIsFriend(false);
        }
      });
    }
  }, [id, currentUser, isFriend]);

  return (
    <div>
      <button className='add-remove-friend-button' onClick={() => {
      requestHandler(`/user/${currentUser.name}`, {_id: id, state: isFriend ? 0 : 1}, 'put', (response) => {
        console.log(isFriend ? 'removing' : 'adding', response);
      });
      setIsFriend(!isFriend);
    }}>{isFriend ? 'Remove Friend' : 'Add Friend'}</button>

    </div>
  );
};

export default FriendToggle;