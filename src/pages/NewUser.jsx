import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export function NewUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        username,
        password,
        email,
        phone
      })

      console.log(response.status === 200)
      if (response.status === 200) {
        navigate('/home');
      } else {
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newUsername = (e) => {
    setUsername(e.target.value);
  };
  const newPassword = (e) => {
    setPassword(e.target.value);
  };
  const newEmail = (e) => {
    setEmail(e.target.value);
  };
  const newPhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <input
        type="text"
        value={username}
        onChange={newUsername}
        placeholder="Name"
      />
      <br />

      <input
        type="text"
        value={password}
        onChange={newPassword}
        placeholder="Password"
      />
      <br />

      <input
        type="text"
        value={email}
        onChange={newEmail}
        placeholder="Email"
      />
      <br />

      <input
        type="text"
        value={phone}
        onChange={newPhone}
        placeholder="Phone Number"
      />
      <br />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
        <div style={{ margin: '0 10px' }}>|</div>
        <button type="submit">Register!</button>
      </div>
    </form>
  );
}