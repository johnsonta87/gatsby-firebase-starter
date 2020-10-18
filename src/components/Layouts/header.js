import React, { useState } from "react"
import PropTypes from "prop-types"
import firebase from "gatsby-plugin-firebase"

export default function Header({ siteTitle }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState('');

  firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  const handleLogout = () => {

    if (window.confirm('Are you sure you want to logout?')) {
      firebase.auth()
        .signOut()
        .then(() => {
          setNotification('Logged out')
          setTimeout(() => {
            setNotification('')
          }, 2000)
        });
    }
  }

  return (
    <header className="masthead-container">
      <h1 style={{ margin: 0 }}>
        {siteTitle}
      </h1>
      {notification && <p className="notification-msg">{notification}</p>}
      {loggedIn && <button onClick={handleLogout} className="button-logout">Logout</button>}
    </header>

  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
