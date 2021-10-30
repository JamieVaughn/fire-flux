import React, { useEffect, useState } from 'react'
import { db } from '../../../config.js'
import { useSelector } from 'react-redux'
import { collection, onSnapshot, doc, getDoc, getDocFromCache, query, where } from 'firebase/firestore'

function Profile (props) {
  const user = useSelector(state => state.auth.currentUser)
  const [userDetails, setUserDetails] = useState({displayName: null})
  useEffect(async () => {
    // create doc reference
    const collectionRef = collection(db, 'users')
    const q = query(collectionRef, where('email','==', user.email))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersArr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      console.log(usersArr)
      setUserDetails(usersArr[0])
    })
    return unsubscribe
  }, [])
  return (
    <div>
      <h2>My Profile</h2>
      <div className="post card grey lighten-3">
        <div className="card-content">
          <span className="card-title">{user.displayName ?? userDetails.fullName ?? 'No Name Found'}</span>
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
