import React, { useState } from 'react'

function Profile (props) {
  const [user, setUser] = useState({
    fullName: 'jamie',
    id: 1,
    email: 'email',
    lastLoginAt: new Date().toString(),
    createdAt: new Date().toString()
  })

  return (
    <div>
      <h2>My Profile</h2>
      <div className="post card grey lighten-3">
        <div className="card-content">
          <span className="card-title">{user.fullName}</span>
          <p className="summary">User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="card-action">
          <div className="footer">
            <p>Last Login: {user.lastLoginAt}</p>
            <p>Joined: {user.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
