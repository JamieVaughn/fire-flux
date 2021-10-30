import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPostAsync } from '../../features/postsSlice.js'

export default function CreatePost (props) {
  const auth = useSelector(state => state.auth.currentUser)
  const dispatch = useDispatch()
  console.log(auth)
  const [post, setPost] = useState({
    title: 'MDN Docs',
    link: 'https://developer.mozilla.org/en-US/',
    category: 'html5',
    summary: 'The mozilla developer network docs',
    notes: 'The mozilla developer network docs',
    author: auth.displayName
  })
  const [valid, setValid] = useState(true)


  const handleChange = e => {
    console.log(e.target.id)
    setPost({
      ...post,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createPostAsync(post))
    setPost({
      title: '',
      link: '',
      category: '',
      summary: '',
      notes: '',
      author: auth.displayName
    })
  }

  const validate = e => {
    e.target.value.length > 40 ? setValid(false) : setValid(true)
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
          <label htmlFor="category">Category</label>
          <input type="text" id="category" value={post.category} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="summary">Summary</label>
          <input 
          type="text" 
          id="summary" 
          maxLength={41}
          value={post.summary} 
          onChange={e => (handleChange(e), validate(e))} 
          onBlur={validate}
          />
        </div>
        <div className="error" hidden={valid}>Summaries must be 40 characters or less.</div>
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
