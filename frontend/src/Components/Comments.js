import React from 'react';
import sortBy from 'sort-by';
import {
  removeComment,
  updateComment,
  voteOnComment
} from '../Actions/Comment';

function Comments(props) {
  return (
    <div className="comments-list">
      {props.comments &&
        props.comments.sort(sortBy('timestamp')).map(comment => (
          <div className="comment" key={comment.id}>
            <div className="comment-author">{comment.author}</div>
            //TODO: Links for editing and deleting
            <div className="voteScore">
              {comment.voteScore}
              <button className="vote-up">Vote Up</button>
              <button className="vote-down">Vote Down</button>
            </div>
            <div className="comment-body">{comment.body}</div>
          </div>
        ))}
    </div>
  );
}

export default Comments;
