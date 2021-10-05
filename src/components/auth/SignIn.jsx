import React, { useState } from 'react'

function SignIn (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPassword(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    console.log('signin',  email, password)
  }

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
      </form>
    </div>
  )
}

export default SignIn
