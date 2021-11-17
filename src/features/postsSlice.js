import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../config'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  () => {
    return
  }
)

export const createPostAsync = createAsyncThunk(
  'posts/createPostAsync',
  async post => {
    try {
      const postsRef = collection(db, 'posts')
      const postRef = await addDoc(postsRef, {...post, createdAt: serverTimestamp() })
      const notifsRef = collection(db, 'notifications')
      const payload = {
        content: 'added a new link!',
        time: serverTimestamp(),
        user: post.author
      }
      const notifRef = addDoc(notifsRef, payload)
      return post
    } catch (err) {
      return err
    } 
  }
)

export const slice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
    postsError: null,
    createError: null
  },
  reducers: {
    createPost (state, action) {
      state.posts.push(action.payload)   
    },
    createError(state, action) {
      state.createError = action.payload ?? 'There was a problem posting you link'
    }
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [createPostAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.posts.push(action.payload)  
    },
    [createPostAsync.rejected]: (state, action) => {
      state.status = 'error'
    }
  }
})

export const {
  createPost,
  createError
} = slice.actions

export default slice.reducer
