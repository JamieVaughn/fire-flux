import React from 'react'
import PostSummary from './PostSummary'

function PostList (props) {

  return (
    <div className="row">
      {[1, 2, 3, 4].map(post =>(
        <PostSummary key={post} link={post} title={'Title '+post} />
      ))}
    </div>
  )
}

export default PostList
