import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  () => {
    return
  }
)

export const createPostAsync = createAsyncThunk(
  'posts/createPostAsync',
  post => {
    return
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
    }
  }
})

export const {
  createPost,
  createError
} = slice.actions

export default slice.reducer
