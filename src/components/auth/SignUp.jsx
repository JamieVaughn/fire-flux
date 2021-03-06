import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupAsync, resetMsg } from '../../features/authSlice'

function SignUp (props) {
  const isAuthed = useSelector(state => state.auth.currentUser)
  const authMsg = useSelector(state => state.auth.message)
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [valid, setValid] = useState(true)

  const handleChange = e => {
    dispatch(resetMsg())
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()    
    try {
      dispatch(signupAsync(credentials))
    } catch (err) {
      console.log('err', err)
    }
  }
 
  const validate = e => {
    e.target.value.length < 8 ? setValid(false) : setValid(true)
  }

  if(isAuthed) return <Redirect push to='/' />

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5>Sign Up</h5>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value={credentials.firstName} onChange={handleChange}/>
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={credentials.lastName} onChange={handleChange}/>
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={credentials.email} onChange={handleChange}/>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          id="password" 
          minLength="8"
          value={credentials.password} 
          onChange={e => (handleChange(e), validate(e))} 
          onFocus={validate}
          />
        </div>
        <div className="error" hidden={valid}>Password must be at least 8 characters.</div>
        <div className="input-field">
          <button className="btn blue lighten-1">Sign Up</button>
        </div>
        {authMsg && credentials.email && <p className='error'>{authMsg}</p>}
      </form>
    </div>
  )
}

export default SignUp
