/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link, Routes, Route } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import react, { useState, useEffect } from 'react'
import axios from 'axios';

import UserProfile from "../lib/UserProfile.jsx";
import FriendsList from "./FriendsList.jsx";
import Map from './Map/Map.jsx'

import { logout, getCurrentUser } from './firebase/firebaseAuth';

export function Home({ loggedEmail, loggedName, loggedPicture, setEmail, setName }) {

  const [currentUser, setCurrentUser] = useState({ email: '', name:'', picture:'' })

  useEffect(() => {
    async function fetchUser() {
      const user = getCurrentUser();
      const response = await axios.get(`/userLogin/${user.email}`)
      setCurrentUser(response.data);
      localStorage.setItem('inUser', JSON.stringify(response.data));
      console.log(window.localStorage.inUser)
    }

    if (loggedEmail && loggedName) {
      setCurrentUser({ email: loggedEmail, name: loggedName, picture: loggedPicture })
    } else {
      fetchUser();
    }
  }, [])

  const handleLogoutClick = (e) => {
    setEmail(null)
    setName(null)
    setCurrentUser({ })
    logout();
  }

  return (
    <>
      <Typography variant="h3">
        C u p Q u e s t
      </Typography>
      <Typography variant="subtitle1">
        Welcome, {currentUser.name}
      </Typography>
      <Link to='/'>
        <button onClick={handleLogoutClick}>Logout</button>
      </Link>
      <Link to={`/user/${currentUser.name}/friends` } state={{ currentUser: currentUser }}>
        <button>Friends</button>
      </Link>
      <Link to= {`/user/${currentUser.name}`} state={{ currentUser: currentUser }}>
        <button>User Profile</button>
      </Link>
      <Link to='/chat' state={{ currentUser: currentUser }}>
        <button>Chat</button>
      </Link>
      <Map />
    </>
  )
}