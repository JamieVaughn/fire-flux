import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth' 
import { auth, db } from '../../config'
import { useAuthState } from '../components/hooks/useAuthState'
import { collection, doc, addDoc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore'

export const signinAsync = createAsyncThunk( 
  'auth/signin', 
  ({ email, password }) => {
    if (auth.currentUser) signOut(auth) 
    return signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        const { accessToken, displayName, email, metadata, uid} = data.user
        console.log(data.user)
        const { creationTime, lastSignInTime } = metadata
        const payload = {token: accessToken, displayName, email, creationTime, lastSignInTime, uid}
        console.log('in', payload)
        return payload
      })
      .catch(error => {
        // Handle error feedback here
        console.log(error)
        return error
    });
  }
)

export const signupAsync = createAsyncThunk(
  'auth/signup',
  ({firstName, lastName, email, password}) => {
    console.log('async', firstName, lastName, email, password)
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up & authed 
        console.log('up', userCredential)
        const user = userCredential.user;
        user.displayName = firstName + ' ' + lastName
        return user
      })
      .catch((error) => {
        // Handle error feedback
        console.log('err', error)
        return error
      })
  }
)
export const authListener = createAsyncThunk(
  'auth/authListener',
  async () => {
      const signInUser = await useAuthState()
      return signInUser.data // payload
  }
)

// export const setUserData = createAsyncThunk(
//   'firebase/setUserData',
//   ({ doc, changes }, thunkAPI) => {
//     const { uid } = thunkAPI.getState().auth.user;
//     const docPath = `users/${uid}/userData/${doc}`;
//     return firestore
//       .doc(docPath)
//       .set(changes, { merge: true });
//   }
// );

// function sendEmailVerification() {
//   firebase.auth().currentUser.sendEmailVerification().then(function() {
//     // Email Verification sent!
//     alert('Email Verification Sent!');
//   });
// }
// function sendPasswordReset() {
//   var email = document.getElementById('email').value;
//   firebase.auth().sendPasswordResetEmail(email).then(function() {
//     // Password Reset Email Sent!
//     alert('Password Reset Email Sent!');
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     if (errorCode == 'auth/invalid-email') {
//       alert(errorMessage);
//     } else if (errorCode == 'auth/user-not-found') {
//       alert(errorMessage);
//     }
//     console.log(error);
//   });
// }

// export const signoutAsync = createAsyncThunk(
//   'auth/signout',
//   async (dispatch, getState) => {
//     return new Promise((resolve) => {
//       auth.signOut();
//     })
//   }
// )


// Write the "slice" of our redux state for posts 
export const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    authError: null,
    status: null
  },
  reducers: {
    // loginSuccess(state, action) {
    //   console.log('login', action)
    //   state.authError = null
    // },
    // loginError(state, action) {
    //   state.currentUser = null
    //   state.authError = 'Login Failed'
    // },
    signoutSuccess(state, action) {
      state.currentUser = null
      signOut(auth).catch(error => {
        console.log(error)
        state.authError = null
      })
    },
    // signupSuccess(state, action) {
    //   console.log('login', action)

    //   state.currentUser = action.payload.currentUser
    //   state.authError = null
    // },
    // signupError(state, action) {
    //   state.currentUser = null
    //   state.authError = action.err
    // }
  },
  extraReducers: {
    [signinAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signinAsync.fulfilled]: (state, action) => {
      console.log('in-', action)
      state.currentUser = action.payload
      state.status = 'success'
    },
    [signinAsync.rejected]: (state, action) => {
      state.currentUser = null
      state.status = 'failed'
    },
    [signupAsync.pending]: (state, action) => {
      state.status = 'loading'
    },
    [signupAsync.fulfilled]: (state, action) => {
      state.currentUser = action.payload
      state.status = 'success'
      // create new user Notification 
      const {displayName, email, uid, metadata } = action.payload
      // const { creationTime, lastSignInTime } = metadata
      console.log(action.payload)
      addDoc(doc(db, `users/${uid}`), {
        displayName, 
        email, 
        uid, 
        creationTime, 
        lastSignInTime
      })
      addDoc(doc(db, `notifications/${uid}`), {
        content: 'just joined!', 
        time: serverTimestamp(), 
        user: state.currentUser.displayName
      })
    },
    [signupAsync['email-already-in-use']]: (state, action) => {
      console.log('email-used')
      state.currentUser = null
      state.authError = action.payload
      state.status = 'failed'
    },
    [signupAsync.rejected]: (state, action) => {
      state.currentUser = null
      state.authError = action.payload
      state.status = 'failed'
    },
    [authListener.pending]: (state, action) => {
      state.status = 'loading'
    },
    [authListener.fulfilled]: (state, action) => {
      console.log('listen', action)
      state.currentUser = action.payload
      state.status = 'success'

    },
    [authListener.rejected]: (state, action) => {
      state.currentUser = null
      state.status = 'failed'
    }
  }
})


// Define State Selectors
export const selectIsAuthed = state => state.auth.currentUser
export const selectAuth = state => state.auth
export const selectAuthError = state => state.authError

export const {
  loginSuccess,
  loginError,
  signoutSuccess,
  signupSuccess,
  signupError
} = slice.actions

export default slice.reducer
