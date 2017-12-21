import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { deletePost, changeVotescore } from '../Actions/Post';
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

  render() {
    const { commentModalOpen } = this.state;
    const { post, upVote, downVote, removePost } = this.props;
    return (
      <div className="post-view">
        <Link to="/">Home</Link>
        <div className="post-details">
          <div className="voteScore">
            {post.voteScore}
            <button className="vote-up" onClick={() => upVote(post.id)}>
              Vote Up
            </button>
            <button className="vote-down" onClick={() => downVote(post.id)}>
              Vote Down
            </button>
          </div>
          <h2 className="post-title">{post.title}</h2>
          <div className="post-author">by {post.author}</div>
          <div className="post-timestamp">{post.timestamp}</div>
          <button className="post-delete" onClick={() => removePost(post.id)}>
            Delete post
          </button>
          <div className="post-body">
            <p>{post.body}</p>
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
            <CommentCreate />
          </Modal>
        </div>
        <div className="post-comments">
          <Comments />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.find(post => post.id === state.selections.selectedPost)
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(changeVotescore(id, 'upVote')),
  downVote: id => dispatch(changeVotescore(id, 'downVote')),
  removePost: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
