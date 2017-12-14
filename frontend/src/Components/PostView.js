import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { updatePost, removePost, voteOnPost } from '../Actions/Post';
import { addComment } from '../Actions/Comment';
import CommentCreate from './CommentCreate';
import Comments from './Comments';

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

  addComment = () =>
    this.setState(() => ({
      commentModalOpen: false
    }));

  render() {
    const { commentModalOpen } = this.state;
    const { voteScore, title, author, timestamp, body } = this.props;
    return (
      <div className="post-view">
        <Link to="/">Home</Link>
        <div className="post-details">
          <div className="voteScore">
            {voteScore}
            <button className="vote-up">Vote Up</button>
            <button className="vote-down">Vote Down</button>
          </div>
          <h2 className="post-title">{title}</h2>
          <div className="post-author">by {author}</div>
          <div className="post-timestamp">{timestamp}</div>
          <div className="post-body">
            <p>{body}</p>
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
            <CommentCreate addComment={this.addComment} />
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
