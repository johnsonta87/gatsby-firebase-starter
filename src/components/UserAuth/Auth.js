import React, { useState, useEffect } from 'react'
import firebase from "gatsby-plugin-firebase"
import SignUp from './SignUp';
import Login from './Login';

export default function User() {
  const [message, setMessage] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authActions, setAuthActions] = useState('');

  firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  useEffect(() => {
    firebase.firestore()
      .collection('message')
      .onSnapshot(snap => {
        const message = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessage(message);
      });
  }, []);

  return (
    <div>
      {!loggedIn &&
        <React.Fragment>
          <div className="auth-main">
            {!authActions &&
              <div className="auth-btns">
                <button onClick={() => setAuthActions('Sign up')}>Sign up</button>
                <button onClick={() => setAuthActions('Login')}>Login</button>
              </div>
            }

            {authActions === 'Sign up' &&
              <React.Fragment>
                <SignUp />
              </React.Fragment>
            }
            {authActions === 'Login' &&
              <React.Fragment>
                <Login />
              </React.Fragment>
            }
          </div>
          {authActions && <button onClick={() => setAuthActions('')} className="button-back">Back</button>}
        </React.Fragment>
      }
    </div>
  )
}
