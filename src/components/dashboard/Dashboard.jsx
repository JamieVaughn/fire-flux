import React from 'react'
import Notifications from './Notifications'
import PostList from '../posts/PostList'

export default function Dashboard (props) {

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m7">
          <PostList />
        </div>
        <div className="col s12 m4 offset-m1">
          <Notifications />
        </div>
      </div>
    </div>
  )
}
