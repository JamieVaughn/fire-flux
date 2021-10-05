import React, { useState } from 'react'

export default function CreatePost (props) {
  const [post, setPost] = useState({
    title: '',
    link: '',
    summary: '',
    notes: ''
  })

  const handleChange = e => {
    console.log(e.target.id)
    setPost({
      ...post,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('post', post)
  }

  return (
    <div className="container" onSubmit={handleSubmit}>
      <form className="white">
        <h5>Create New Post</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={post.title} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="link">Link</label>
          <input type="text" id="link" value={post.link} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="summary">Summary</label>
          <input type="text" id="summary" value={post.summary} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="notes">Notes</label>
          <textarea type="text" id="notes" value={post.notes} onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn blue lighten-1">Submit</button>
        </div>
      </form>

    </div>
  )
}
