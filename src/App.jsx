import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NewUser } from "./pages/NewUser";
import { Home } from "./pages/Home";
import { SplashPage } from "./pages/SplashPage";
import { ShopOverview } from "./pages/ShopOverview";
import UserProfile from "./lib/UserProfile.jsx";
import FriendsList from "./pages/FriendsList.jsx";

function App() {
  const [userId, setUserId] = useState('649512218eda7c4e347c61bf');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('');
  const [bio, setBio] = useState('I love Coffee');

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashPage email={email} setEmail={setEmail} setName={setName} setPicture={setPicture}/>} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/home" element={<Home loggedEmail={email} loggedName={name} loggedPicture={picture} setEmail={setEmail} setName={setName} />} />
        <Route path="/overview" element={<ShopOverview userId={userId} setUserId={setUserId} />} />
        <Route path="/user/:name" element={<UserProfile isUser={true} />} />
        <Route path="/user/:name/friends" element={<FriendsList />} />
      </Routes>
    </>
  )
}

export default App;