/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation  } from 'react-router-dom'

import UserHistoryList from './UserHistoryList.jsx';
import FriendToggle from './FriendToggle.jsx';

import requestHandler from './requestHandler.js';

const UserProfile = (props) => {
  const [isUser, setIsUser] = useState(false);
  const [profile, setProfile] = useState({});
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem('inUser'));
  const location = useLocation();
  // console.log('Use Location Hook: ', location);
  // console.log('Use Location State: ', location.state.currentUser);

  useEffect(() => {

    if(name === user.name) {
      setIsUser(true);
      setProfile(user);
    } else {
    requestHandler(`/user/${name}`, null, 'get', (response) => {
      setProfile(response.data);
      setIsUser(false);
    });
    }


  }, [name]);

  return (
    // only thing that is different between friend and user
    // profile is that user profile has edit profile button
    // whereas friend profile has add/remove friend button
    // accepts props.isUser and conditionally renders button
    <div className="profile">
      <div className='upperRibbon'>
      <Link to='/home'> <button className='ribbonButton'>Home</button> </Link>
        <img src="../logo-no-background.svg" alt="CupQuest Logo" className="profile-logo" ></img>
        <Link to='/'> <button className='ribbonButton'>Logout</button> </Link>
      </div>

      <div className='profile-info'>
        <div className='profile-picture'>
          <img className='profile-pic' src={profile.picture} alt={'UPLOAD'}></img>
        </div>
        <div className="profile-text">
          <div className='profile-username'><h4>{profile.name}</h4></div>
          <div className='profile-biography'><p>{profile.bio}</p></div>
        </div>
      </div>
      <div className="buttons">
        <Link to={{pathname: `/user/${profile.name}/friends` }} state={{ currentUser: location.state.currentUser }}>
          <button className="friends-button" >Friends</button>
        </Link>
        {isUser ? <div className='edit-button' onClick={() => {console.log('hi')}}>Edit User</div> :
          <FriendToggle currentUser={location.state.currentUser} id={profile._id} name={profile.name} />
        }
      </div>
      <div className='profile-history'>
      <div><h4>User History</h4></div>
        <UserHistoryList user={user} />
      </div>
    </div>
  )
}

export default UserProfile;