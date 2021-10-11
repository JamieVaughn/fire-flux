import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../config'

export const useAuthState = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      console.log('auth user', auth.user ?? 'no user detected')
      if(user === null) reject('no user detected')
      resolve({
        isSignIn: true,
        uid: user.uid,
        username:user.displayName, 
        email:user.email,
      })
    })
  })
}
