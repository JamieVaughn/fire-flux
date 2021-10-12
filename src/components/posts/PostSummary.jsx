import React from 'react'
import { NavLink } from 'react-router-dom'
import simpleIcons from 'simple-icons'

function getIcon(str = '') {
  const categories = ['html5', 'css3', 'csswizardry', 'git', 'webcomponentsdotorg', 'materialdesign', 'bootstrap', 'bulma', 'github', 'amazonaws', 'json', 'redux', 'javascript', 'svg', 'visualstudiocode', 'freecodecamp', 'codesandbox', 'codepen', 'firebase', 'npm', 'nodedotjs', 'react', 'reactrouter', 'angular', 'vuedotjs'];
  str = categories.includes(str) ? str : 'react'
  let icon = simpleIcons[str]
  return {path: icon.path, fill: '#'+icon.hex}
}

export default function PostSummary (props) {
  const { path, fill } = getIcon('')
  return (
    <div className="post card-horizontal grey lighten-3">
      <div className="card-image">
        <svg fill={fill} role="img" viewBox="0 0 24 24" xmlns="https://ww.w3.org/2000/svg">
          <path d={path} />
        </svg>
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
