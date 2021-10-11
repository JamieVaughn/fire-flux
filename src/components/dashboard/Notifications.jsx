import React, {useState, useEffect} from 'react'
import { db } from '../../../config.js'
import { collection, getDocs, limit, query, onSnapshot } from 'firebase/firestore'

// async function getNotifications() {
//   const mySnapshot = await getDocs(collection(db, 'notifications'))
//   if(mySnapshot.exists()) mySnapshot.data()
// }

function Notifications (props) {
  const [notifications, setNotifications] = useState([])
  // let notifications = [
  //   {id: 1, user: 'user', content: 'added a new link!', time: new Date().toISOString() },
  //   {id: 2, user: 'user2', content: 'added a new link!', time: new Date().toISOString() },
  // ]
  // useEffect(() => {
  //   onSnapshot(query(
  //     collection(db, 'posts'),
  //     limit(5)
  //   ),
  //   (snapshot) => {
  //     snapshot.forEach(snap => console.log('snap', snap.docs()))
  //     console.log('note', snapshot, snapshot.size)
  //     setNotifications(snapshot.docs)
  //   }
  //   )
  //   getDocs(collection(db, 'notifications')).then(data => {
  //     console.log('noteslist', data.docs)
  //   })
  // }, [])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      console.log('notes', snapshot, snapshot.docs.map(doc => doc.data()))
    })
    return unsub
  }, [])

  return (
    <div className='notifications section'>
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notification text-small">
            {
              notifications?.length ?  notifications.map(note => (
                <li key={note.id}>
                  <span className="pink-text">{note.user} </span>
                  <span>{note.content}</span>
                  <div className="grey-text note-date">
                    {JSON.stringify(note.time)}
                  </div>
                </li>
              ))
              : <li>No notifications found</li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
