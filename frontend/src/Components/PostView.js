import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { deletePost, changeVotescore, selectPost } from '../Actions/Post';
import {
  openCommentCreateModal,
  closeCommentCreateModal
} from '../Actions/Modal';
import CommentCreate from './CommentCreate';
import Comments from './Comments';

class PostView extends Component {
  render() {
    const commentModalOpen = this.props.modalMode === 'opened' ? true : false;
    const {
      post,
      upVote,
      downVote,
      removePost,
      openPost,
      openCommentModal,
      closeCommentModal
    } = this.props;
    return (
      <div className="post-view">
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
          <Link
            className="post-edit-link"
            to={`/${post.category}/${post.id}/edit`}
            onClick={() => openPost(post.id)}
          >
            Edit
          </Link>
          <button className="post-delete" onClick={() => removePost(post.id)}>
            Delete post
          </button>
          <div className="post-body">
            <p>{post.body}</p>
          </div>
        </div>
        <div className="add-comment">
          <button
            onClick={() => openCommentModal()}
            className="comment-add-btn"
          >
            Add new Comment
          </button>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={commentModalOpen}
            onRequestClose={() => closeCommentModal()}
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
  post: state.posts.find(post => post.id === state.selections.selectedPost),
  modalMode: state.modals.commentCreateModal
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(changeVotescore(id, 'upVote')),
  downVote: id => dispatch(changeVotescore(id, 'downVote')),
  removePost: id => dispatch(deletePost(id)),
  openPost: id => dispatch(selectPost(id)),
  openCommentModal: () => dispatch(openCommentCreateModal()),
  closeCommentModal: () => dispatch(closeCommentCreateModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
