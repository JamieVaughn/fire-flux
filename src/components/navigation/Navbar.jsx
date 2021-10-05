import React from 'react'
import AuthedLinks from './AuthedLinks'
import UnAuthedLinks from './UnAuthedLinks'
import { Link } from 'react-router-dom'

function Navbar (props) {

  return (
    <nav className="nav-extended blue darken-3">
      <div className="nav-wrapper">
        <Link className="brand" to='/'>Bookmarks App</Link>
      </div>
      <div className="nav-content">
        <AuthedLinks />
        <UnAuthedLinks />
      </div>
    </nav>
  )
}

export default Navbar
