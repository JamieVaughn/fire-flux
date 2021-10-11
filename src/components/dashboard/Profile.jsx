import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile (props) {

  const user = useSelector(state => state.auth?.currentUser)
  console.log(user)
  if(user === null) <Redirect push to='/signin' />

  return (
    <div>
      <h2>My Profile</h2>
      <div className="post card grey lighten-3">
        <div className="card-content">
          <span className="card-title">{user?.displayName ?? 'No name given'}</span>
          <p className="summary">User ID: {user.uid}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="card-action">
          <div className="footer">
            <p>Last Login: {user.lastSignInTime}</p>
            <p>Joined: {user.creationTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
