import React, { Component } from 'react';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import {
  deleteComment,
  changeVotescore,
  selectComment
} from '../Actions/Comment';
import CommentEdit from './CommentEdit';

class Comments extends Component {
  state = { editModalOpen: false };

  openEditModal = id => {
    this.setState({ editModalOpen: true });
    this.props.openForEdit(id);
  };

  closeEditModal = () => {
    this.setState({ editModalOpen: false });
  };

  render() {
    const { comments, upVote, downVote, deleteComment } = this.props;
    const { editModalOpen } = this.state;
    return (
      <div className="comments-list">
        {comments.sort(sortBy('timestamp')).map(comment => (
          <div className="comment" key={comment.id}>
            <div className="comment-author">{comment.author}</div>
            <button
              className="comment-edit-button"
              onClick={() => this.openEditModal(comment.id)}
            >
              Edit
            </button>
            <button
              className="comment-delete-button"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
            <div className="voteScore">
              {comment.voteScore}
              <button className="vote-up" onClick={() => upVote(comment.id)}>
                Vote Up
              </button>
              <button
                className="vote-down"
                onClick={() => downVote(comment.id)}
              >
                Vote Down
              </button>
            </div>
            <div className="comment-body">{comment.body}</div>
          </div>
        ))}
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={editModalOpen}
          onRequestClose={this.closeEditModal}
          contentLabel="Modal"
        >
          <CommentEdit />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  upVote: (id, option) => dispatch(changeVotescore(id, 'upVote')),
  downVote: (id, option) => dispatch(changeVotescore(id, 'downVote')),
  removeComment: id => dispatch(deleteComment(id)),
  openForEdit: id => dispatch(selectComment(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
