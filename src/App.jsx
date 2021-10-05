import React from 'react'
import Navbar from './components/navigation/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Profile from './components/dashboard/Profile'
import CreatePost from './components/posts/CreatePost'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile' component={Profile} />
            <Route path='/create' component={CreatePost} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
