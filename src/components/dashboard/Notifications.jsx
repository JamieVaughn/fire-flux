import React from 'react'

function Notifications (props) {

  let notifications = [
    {id: 1, user: 'user', content: 'added a new link!', time: new Date().toISOString() },
    {id: 2, user: 'user2', content: 'added a new link!', time: new Date().toISOString() },
  ]

  return (
    <div className='notifications section'>
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notification text-small">
            {
              notifications?.map(note => (
                <li key={note.id}>
                  <span className="pink-text">{note.user} </span>
                  <span>{note.content}</span>
                  <div className="grey-text note-date">
                    {JSON.stringify(note.time)}
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
