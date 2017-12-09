import React from 'react'

function CommentEdit(comment) {
  return (
    <div className='comment-edit'>
    	<p>Edit comment</p>
    	<p>Author: {comment.author}</p>
    	<input className='comment-body-input' type='text' value={comment.body} required/>
    	<button className='comment-save-btn'>Save</button>
    </div>
  );
}

export default CommentEdit;