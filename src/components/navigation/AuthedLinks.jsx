import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../../features/authSlice'

export default function AuthedLinks (props) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(signoutSuccess())
  }

  return (
    <ul className='tabs tabs-transparent'>
      <li className='tab'><NavLink to='/create'>Create Post</NavLink></li>
      <li className='tab'><NavLink to='/' onClick={handleLogout}>Logout</NavLink></li>
      <li className='tab'>
        <NavLink to='/profile' className="icon btn btn-floating orange lighten-2">
        <i className="material-icons">person</i>
        </NavLink>
      </li>
    </ul>
  )
}
