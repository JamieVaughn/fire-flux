import React from 'react'
import AuthedLinks from './AuthedLinks'
import UnAuthedLinks from './UnAuthedLinks'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar (props) {
  const isAuthed = useSelector(state => state.auth.currentUser)
  return (
    <nav className="nav-extended blue darken-3">
      <div className="nav-wrapper">
        <Link className="brand" to='/'>Bookmarks App</Link>
      </div>
      <div className="nav-content">
        { isAuthed ? <AuthedLinks /> : <UnAuthedLinks />}
      </div>
    </nav>
  )
}

export default Navbar
