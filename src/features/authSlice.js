import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, db } from '../../config'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthState } from   '../components/hooks/useAuthState'
import { updateProfile } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const signinAsync = createAsyncThunk(
  'auth/signin',
  ({email, password}) => {
    if(auth.currentUser) signOut(auth)
    return signInWithEmailAndPassword(auth, email, password)
    .then(data => {
      console.log('user data', data)
      const { accessToken, displayName, email, metadata, uid } = data.user
      const { creationTime, lastSignInTime } = metadata
      const payload = {
        // token: accessToken,
        displayName,
        email,
        creationTime,
        lastSignInTime,
        uid
      }
      console.log(payload)
      return payload
    })
    .catch(error => {
      console.log('signin err', error)
      throw error
    })
  }
)

export const signupAsync = createAsyncThunk(
  'auth/signupAsync',
  ({firstName, lastName, email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(creds => {
      updateProfile(auth.currentUser, {displayName: firstName + ' ' + lastName})
      const notifsRef = collection(db, 'notifications')
      const payload = {
        content: 'just joined!',
        time: serverTimestamp(),
        user: firstName + ' ' + lastName
      }
      const notifRef = addDoc(notifsRef, payload)
      return creds
    })
    .then(creds => {
      console.log('signedup', creds)
      const {accessToken, displayName, email, emailVerified, uid} = creds.user
      const { createdAt, lastLoginAt } = creds.user.metadata
      const fullName = firstName + ' ' + lastName
      return {accessToken, displayName, fullName, email, emailVerified, createdAt, lastLoginAt, uid}
    }).catch(error => {
      console.log(error)
      return error
    })

  }
)

export const authListener = createAsyncThunk(
  'auth/authListener',
  async () => {
    const signinUser = await useAuthState()
    return signInUser.data // payload
  }
)

export const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    authError: null,
    status: null,
    message: ''
  },
  reducers: {
    signoutSuccess(state, action) {
      state.currentUser = null
      signOut(auth).catch(error => {
        console.log(error)
        state.authError = error
      })
    },
    resetMsg(state, action) {
      state.message = ''
    }
  },
  extraReducers: {
    [signinAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signinAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      console.log('signedin success', action)
      const user = {
        ...action.meta.arg,
        ...action.metadata
      }
      state.currentUser = action.payload
    },
    [signinAsync.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [signupAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signupAsync.fulfilled]: (state, action) => {
      console.log('signedup server response', action)
      if(action.payload.name === 'FirebaseError') {
        state.status = 'failed'
        state.message = action.payload?.code?.split('/')[1].replace('-', ' ')
      } else {
        state.currentUser = action.payload
        state.status = 'success'
        state.message = ''
        const { displayName, email, uid, fullName, createdAt, lastLoginAt } = action.payload
        const usersRef = collection(db, 'users')
        const payload = {
          email,
          displayName,
          fullName,
          uid,
          createdAt
        }
        const docRef = addDoc(usersRef, payload)
      }
    },
    [signupAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.authError = action.payload
      state.currentUser = null
    },
    [authListener.pending]: (state, action) => {
      state.status = 'loading'
    },
    [authListener.fulfilled]: (state, action) => {
      state.status = 'success'
      console.log('listen', action)
      state.currentUser = action.payload
    },
    [authListener.rejected]: (state, action) => {
      state.currentUser = null
      state.status = 'failed'
    }
  }
})

export const {
  loginSuccess,
  loginError,
  signoutSuccess,
  signupSuccess,
  signupError,
  resetMsg
} = slice.actions
 
export default slice.reducer
