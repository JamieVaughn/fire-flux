import React, {useEffect, useState} from 'react'
import { db } from '../../../config.js'
import { doc, getDoc, getDocFromCache } from 'firebase/firestore'

export default function PostDetails (props) {
  const [post, setPost] = useState({title: 'loading', link: '', summary: 'loading', notes: 'loading'})
  console.log(props.match.params.id)
  const id = props.match.params.id ?? ''
  useEffect(async () => {
    // create doc reference
    const docRef = doc(db, 'posts', id)
    // fetch single document with getDoc
    // const doc = await getDocFromCache(docRef) // Can retrieve from a cache
    const document = await getDoc(docRef)
    const post = await document.data()
    setPost(post)
  }, [])

  console.log('post detail', post)
  return (
    <div className="container section card">
      <div className="card-content">
        <span className="card-title">
          <a href={post?.link}>{post.title}</a>
        </span>
        <h6>{post.summary}</h6>
        <p className="flow-text">{post.notes}</p>
      </div>
      <div className="card-action">
        <p>User Name - Date</p>
      </div>
    </div>
  )
}
