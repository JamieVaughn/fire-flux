import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PostSummary (props) {

  return (
    <div className="post card-horizontal grey lighten-3">
      <div className="card-image">
        <img src="../../logo.svg" alt="card image" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title">
            <NavLink to={`/post/${props.link}`}>{props.title}</NavLink>
          </span>
          <p className="summary">{props.summary}</p>
        </div>
        <div className="card-action">
          <NavLink to={`/post/${props.link}`}>See Notes</NavLink>
        </div>
      </div>
    </div>
  )
}
