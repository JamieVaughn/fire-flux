import React, { useEffect } from 'react'
import PostSummary from './PostSummary'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPosts } from '../../features/postsSlice'
import { db } from '../../../config'
import { doc, collection, getDoc, limit, query } from 'firebase/firestore'




function PostList (props) {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)

  // useEffect(() => {
  //   console.log('db', db)
  //   query(
  //     collection(db, 'posts'),
  //     limit(5),
  //     snapshot => (
  //       console.log('snap', snapshot, snapshot.docs)
  //     )
  //   )
  // }, [])
  useEffect(() => {
    async function getFB() {
      const docRef = collection(db, "posts");
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap)
        // const docRef = doc(db, "cities", "SF");
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);
      if(doc.exists()) {
        const docSnap = doc.data()
        console.log(docSnap)
      }
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }
  getFB()
  }, [])

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  // const postRef = doc(useFirestore(), 'posts', '9GSTUjwbyPgDE8FWNBZs');

  // console.log('posts', posts, postRef)
  return (
    <div className="row">
      {posts.length ? posts.map(post =>(
        <PostSummary key={post} link={post} title={'Title '+post} />
      ))
      : <div>No Posts found</div>
    }
    </div>
  )
}

export default PostList
