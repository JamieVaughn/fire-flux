import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UnAuthedLinks (props) {

  return (
    <ul className='tabs tabs-transparent'>
      <li className='tab'><NavLink to='/signup'>Signup</NavLink></li>
      <li className='tab'><NavLink to='/signin'>Login</NavLink></li>
    </ul>
  )
}
