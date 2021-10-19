import React, {useEffect, useState} from 'react'
import { db } from '../../../config.js'
import { collection, doc, onSnapshot, addDoc } from 'firebase/firestore'

export default function PostDetails (props) {
  const [post, setPost] = useState({})
  const id = props.match.params.id
  console.log(props)
  // const post = { 
  //   title: 'React Docs',
  //   notes: 'This is notes for react docs',
  //   link: 'https://reactjs.org'
  // }
  useEffect(() => {
    // onSnapshot returns an unsubscribe function to garbage collect itself, so return it
    const unsubscribe = onSnapshot(doc(db, 'posts', id), (snapshot) => {
      console.log('details', snapshot.doc)
      // const postsArr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      setPost(snapshot.doc)
    })
    return unsubscribe
  }, [])

  console.log('detail', post)
  return (
    <div className="container section card">
      <div className="card-content">
        <span className="card-title">
          <a href={post.link}>{post.title}</a>
        </span>
        <p className="flow-text">{post.notes}</p>
      </div>
      <div className="card-action">
        <p>User Name - Date</p>
      </div>
    </div>
  )
}
