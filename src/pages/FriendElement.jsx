/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import ProfileLink from '../lib/ProfileLink.jsx';

const FriendElement = ({ friend, currentUser }) => {
  return (
    <div className="friend">
      <div className="friend-profile-pic"></div>
      <ProfileLink name={friend.name} currentUser={currentUser} />
    </div>
  )
}

export default FriendElement;