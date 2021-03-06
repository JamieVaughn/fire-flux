import React, {useEffect, useState} from 'react'
import bgImg from '../img/bglg.svg' // import img assets so relative path is correct
import { db } from '../../../config.js'
import { doc, getDoc } from 'firebase/firestore'

export default function PostDetails (props) {
  const [post, setPost] = useState({title: 'loading', author: 'loading', link: '', summary: 'loading', notes: 'loading'})
  const id = props.match.params.id ?? ''
  console.log(post)
  useEffect(async () => {
    // create doc reference
    const docRef = doc(db, 'posts', id)
    // fetch single document with getDoc
    // const doc = await getDocFromCache(docRef) // Can retrieve from a cache
    const document = await getDoc(docRef)
    const post = await document.data()
    post.author = post.author ?? post.authorFirstName + ' ' + post.authorLastName
    setPost(post)
  }, [])
    
    if(post.title === 'loading') return <img src={bgImg} style={{width: '100vw', height: '100vh', position: 'absolute', left: '0'}} />
  return (
    <>
    <img src={bgImg} className={post.link.length ? 'loading' : ''} style={{width: '100vw', height: '100vh', position: 'absolute', left: '0'}} />
    <div className="container section card">
      <div className="card-content">
        <span className="card-title">
          <a href={post?.link}>{post.title}</a>
        </span>
        <h6>{post.summary}</h6>
        <p className="flow-text">{post.notes}</p>
      </div>
      <div className="card-action">
        <p>By: {post.author}</p>
        <p>Submitted: {new Date(post?.createdAt?.seconds).toLocaleString()}</p>
      </div>
    </div>
    </>
  )
}
