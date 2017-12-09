import React from 'react'

function CommentCreate(props) {
  return (
   	 <div className="comment-create">
        <input
        className="comment-author-input"
        type="text"
        placeholder="Comment Author" required
        />
        <input
        className="comment-body-input"
        type="text"
        placeholder="Comment Body" required
        />
        <button className='comment-save-btn' onClick={props.addComment}>Save</button>
     </div>
  )
}

export default CommentCreate;