import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { updatePost, removePost, voteOnPost } from '../Actions/Post';
import { addComment } from '../Actions/Comment';
import CommentCreate from 'CommentCreate'

class PostView extends Component {
  state = { commentModalOpen: false };

  openCommentModal = () =>
    this.setState(() => ({
      commentModalOpen: true
    }));

  closeCommentModal = () =>
    this.setState(() => ({
      commentModalOpen: false
    }));

  addComment = ({}) => ({});

  render() {
    const { commentModalOpen } = this.state;
    return (
      <div className="post-view">
        <Link to="/">Home</Link>
        <div className="post-details">
          <div className="voteScore">
            {props.voteScore}
            <button className="vote-up">Vote Up</button>
            <button className="vote-down">Vote Down</button>
          </div>
          <h2 className="post-title">{props.title}</h2>
          <div className="post-author">by {props.author}</div>
          <div className="post-timestamp">{props.timestamp}</div>
          <div className="post-body">
            <p>{props.body}</p>
          </div>
        </div>
        <div className="add-comment">
          <button
            onClick={() => this.openCommentModal()}
            className="comment-add-btn"
          >
            Add new Comment
          </button>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={commentModalOpen}
            onRequestClose={this.closeCommentModal}
            contentLabel="Modal"
          >
            <CommentCreate addComment={this.addComment}/>
          </Modal>
        </div>
        <div className="post-comments">
          <Comments />
        </div>
      </div>
    );
  }
}

export default PostView;
