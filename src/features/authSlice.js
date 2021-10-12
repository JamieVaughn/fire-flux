import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, db } from '../../config'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthState } from   '../components/hooks/useAuthState'
import { collection, doc, setDoc } from "firebase/firestore"; 

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
        token: accessToken,
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
      return error
    })
  }
)

export const signupAsync = createAsyncThunk(
  'auth/signupAsync',
  ({firstName, lastName, email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password).then(creds => {
      console.log('signedup', creds)
      const user = creds.user
      user.displayName = firstName + ' ' + lastName
      return user
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
    status: null
  },
  reducers: {
    signoutSuccess(state, action) {
      state.currentUser = null
      signOut(auth).catch(error => {
        console.log(error)
        state.authError = error
      })
    }
  },
  extraReducers: {
    [signinAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signinAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      console.log('signedin success', action)
      state.currentUser = action.payload
    },
    [signinAsync.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [signupAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signupAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      console.log('signedup success', action)
      state.currentUser = action.payload
      const { displayName, email, uid, metadata } = action.payload
      const { creationTime, lastSignInTime} = metadata
      // const userCol = collection(db, 'users') // old way -> db.collection('users')
      // setDoc(doc(userCol, uid), {
      //   displayName, email, uid, creationTime, lastSignInTime
      // })
      // .then(data => console.log('set', data))
      // .catch(error => console.log('setError', error))
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
  signupError
} = slice.actions
 
export default slice.reducer
