import React, { useState } from 'react'
import firebase from "gatsby-plugin-firebase"

export default function SignUp() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
        'Password and password confirmation does not match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000);
      setPassword('');
      setPassConf('');
      return null;
    }
    firebase.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
  }

  return (
    <form onSubmit={handleLogin} className="fb-form">
      <label>
        Email:
          <input type="text" value={userName}
          onChange={({ target }) => setUsername(target.value)} />
      </label>
      <label>
        Password:
          <input type="password" value={password}
          onChange={({ target }) => setPassword(target.value)} />
      </label>
      <label>
        Confirm password:
          <input type="password" value={passConf}
          onChange={({ target }) => setPassConf(target.value)} />
      </label>
      {notification && <p className="notification-msg">{notification}</p>}
      <button type="submit">Register</button>
    </form>
  )
}
