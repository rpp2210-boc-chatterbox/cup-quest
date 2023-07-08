import { useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getCurrentUser } from './firebaseAuth';

function GoogleSignIn({ setEmail, setName, setPicture }) {
  const navigate = useNavigate();
  const signInDiv = useRef(null);

  useEffect(() => {
    function init() {
      /* global google */
      if (window.google && signInDiv.current) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
          signInDiv.current,
          { theme: "filled", size: "medium" }
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      }
    }

    if (window.google) {
      init();
    } else {
      // If Google API library isn't loaded yet, wait for it to load before initializing
      window.addEventListener('load', init);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('load', init);
    };
  }, []);

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    const username = userObject.given_name;
    const picture = userObject.picture;
    const email = userObject.email;

    axios.post('/validateOnClick', {
      username,
      email
    })
      .then((response) => {
        if (response.status === 200) {
          // User doesn't exist, register a new user
          axios.post('/register', {
            username,
            email,
            picture
          })
            .then((response) => {
              if (response.status === 200) {
                setEmail(email);
                setName(username);
                setPicture(picture);
                navigate('/home');
              }
            })
            .catch((err) => {
              console.error(err.response);
              if (err.response.data.message) {
                alert(err.response.data.message);
              }
            });
        } else if (response.status === 201) {
          // User exists, log in the existing user
          console.log(email, username, picture)
          setEmail(email);
          setName(username);
          setPicture(picture);
          navigate('/home');
        }
      })
      .catch((err) => {
        console.error(err.response);
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  }

  return <div ref={signInDiv}></div>;
}

export default GoogleSignIn;
