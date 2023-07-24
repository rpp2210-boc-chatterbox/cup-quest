/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileLink = ({ name, currentUser }) => {
  return (
    <Link to={{pathname: `/user/${name}`}} state={{ currentUser: currentUser }}>
      <div className="friend-profile-name" >{name}</div>
    </Link>
  )
}

export default ProfileLink;