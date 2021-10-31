import React, { useEffect, useState } from 'react'
import bgImg from '../img/bglg.svg'
import PostSummary from './PostSummary'
import { db } from '../../../config.js'
import { collection, doc, onSnapshot, addDoc } from 'firebase/firestore'


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
    <div className="row">
      {posts.length ? posts.map(post =>(
        <PostSummary key={post.id} post={post} title={'Title '+post} />
      ))
    : <img src={bgImg} width='400px' height='400px' style={{width: '100vw', height: '100vh', position: 'absolute', left: '0'}}/>
    }
    </div>
  )
}

export default PostList
