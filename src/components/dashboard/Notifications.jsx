import React, { useState, useEffect } from 'react'
import { db } from '../../../config.js'
import { collection, onSnapshot, query, limit } from 'firebase/firestore'

function Notifications (props) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // onSnapshot returns an unsubscribe function to garbage collect itself, so return it
    const q = query(collection(db, 'notifications'), limit(3))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('snapshot', snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      const notifsArr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      setNotifications(notifsArr)
    })
    return unsubscribe
  }, [])

  return (
    <div className='notifications section'>
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notification-list text-small">
            {
              notifications.length ?
              notifications?.map(note => (
                <li key={note.id} className="notification">
                  <span className="pink-text">{note.user} </span>
                  <span>{note.content}</span>
                  <div className="grey-text note-date" title={JSON.stringify(note.time)}>
                    {new Date(note?.time?.seconds*1000).toLocaleString()}
                  </div>
                </li>
              ))
              :
              <li>No notifications found</li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
