import React, { useState } from 'react'

function SignUp (props) {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [valid, setValid] = useState(true)

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log('signup',  credentials)
  }
  const validate = e => {
    e.target.value.length < 8 ? setValid(false) : setValid(true)
  }

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
          pattern=""
          value={credentials.password} 
          onChange={handleChange} 
          onChange={validate}
          onFocus={validate}
          />
        </div>
        <div className="error" hidden={valid}>Password must be at least 8 characters.</div>
        <div className="input-field">
          <button className="btn blue lighten-1">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
