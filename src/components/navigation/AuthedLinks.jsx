import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AuthedLinks (props) {

  return (
    <ul className='tabs tabs-transparent'>
      <li className='tab'><NavLink to='/create'>Create Post</NavLink></li>
      <li className='tab'><NavLink to='/'>Logout</NavLink></li>
      <li className='tab'>
        <NavLink to='/profile' className="icon btn btn-floating orange lighten-2">
        <i className="material-icons">person</i>
        </NavLink>
      </li>
    </ul>
  )
}
