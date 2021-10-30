import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signinAsync } from '../../features/authSlice.js'

function SignIn (props) {
  const dispatch = useDispatch()
  const isAuthed = useSelector(state => state.auth.currentUser)
  const status = useSelector(state => state.auth.status)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPassword(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signinAsync({email, password}))
  }

  if(isAuthed) return <Redirect push to='/' />

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5>Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmail}/>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePass}/>
        </div>
        <div className="input-field">
          <button className="btn blue lighten-1">Login</button>
        </div>
      {status === 'failed' && <span className="error">Error signing in</span>}
      </form>
    </div>
  )
}

export default SignIn
