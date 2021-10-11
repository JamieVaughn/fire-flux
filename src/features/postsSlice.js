import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../config'
import { doc, addDoc, setDoc, getDocs, collection, onSnapshot, query } from 'firebase/firestore'

const uuid = () => {
  let url = URL.createObjectURL(new Blob())
  URL.revokeObjectURL(url)
  return url.split('/')[3]
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  () => {
      return getDocs(collection(db, 'posts')).then(data => {
        console.log('posts1', data, data.docs)
        const mposts = data.docs.map(p => ({...p.data(), id: p.id}))
        return mposts
      }).catch(error => {
        console.log(error);
        return error
      })
    //     getDoc(collection(db, 'posts/9GSTUjwbyPgDE8FWNBZs'))
    // return await onSnapshot(collection(db, 'users'), snapshot => {
    //   console.log(snapshot)
    //   return snapshot
    // })
    // return await 
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('posts', data)
    //     return data
    //   })
  }
)

export const createPostAsync = createAsyncThunk(
  'posts/createPost',
  (post) => {
    console.log('createthunk', post)
    try {
      const postDoc = doc(db, `posts/${uuid()}`)
      setDoc(postDoc, post, {merge: true})
      return post
    } catch (error) {
      console.log('createError', error)
      return error
    }
  }
)

const slice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
    postsError: null,
    createError: null,
  },
  reducers: {
    createPost(state, action) {
      state.posts.push(action.payload)
      const postCollection = collection(db, `posts`)
      console.log('doc', postCollection, action.payload)
      addDoc(postCollection, action.payload)
      state.createError = null
    },
    createError(state, action) {
      state.createError = 'There was a problem posting your link.'
    }
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.posts.push(...action.payload)
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.postsError = action.payload
    },
    [createPostAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [createPostAsync.rejected]: (state, action) => {
      state.status = 'failed'
      console.log(action.payload)
      state.createError = action.payload
    }
  }
})

// Define State Selectors
export const selectPosts = state => state.posts
export const selectPostError = state => state.authError

export const {
  createPost,
  // createError
} = slice.actions

export default slice.reducer
