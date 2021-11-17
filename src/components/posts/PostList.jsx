import React, { useEffect, useState } from 'react'
import bgImg from '../img/bglg.svg' // import img assets so relative path is correct
import PostSummary from './PostSummary'
import { db } from '../../../config.js'
import { collection, onSnapshot } from 'firebase/firestore'


function PostList (props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // onSnapshot returns an unsubscribe function to garbage collect itself, so return it
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsArr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      setPosts(postsArr)
    })
    return unsubscribe
  }, [])

  return (
    <div className="row postlist">
      <img src={bgImg} className={posts.length ? 'loading' : ''} style={{width: '100vw', height: '100vh', position: 'absolute', left: '0'}} />
      {posts.length ? posts.map(post => (
        <PostSummary key={post.id} post={post} title={'Title '+post} />
        ))
        : null //<img src={bgImg} style={{width: '100vw', height: '100vh', position: 'absolute', left: '0'}} />
      }
    </div>
  )
}

export default PostList
