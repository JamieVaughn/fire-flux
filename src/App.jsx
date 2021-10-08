import React from 'react'
import Navbar from './components/navigation/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Profile from './components/dashboard/Profile'
import CreatePost from './components/posts/CreatePost'
import PostDetails from './components/posts/PostDetails'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <main className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile' component={Profile} />
            <Route path='/create' component={CreatePost} />
            <Route path='/post/:id' component={PostDetails} />
          </Switch>
        </div>
      </main>
    </Router>
  )
}

export default App
