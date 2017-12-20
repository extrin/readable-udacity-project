import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../Actions/Comment';

class CommentEdit extends Component {
  state = { body: '' };

  updateBody = commentBody => {
    this.setState({ body: commentBody });
  };

  render() {
    const { author, body, id, saveComment } = this.props;

    return (
      <div className="comment-edit">
        <p>Edit comment</p>
        <p>Author: {author}</p>
        <input
          className="comment-body-input"
          type="text"
          value={this.state.body || body}
          onChange={event => this.updateBody(event.target.value)}
          required
        />
        <button
          className="comment-save-btn"
          onClick={() => saveComment(id, this.state.body)}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const comment = state.comments.filter(
    com => com.id === state.selections.selectedComment
  );
  return {
    author: comment.author,
    body: comment.body,
    id: state.selections.selectedComment
  };
};

const mapDispatchToProps = dispatch => ({
  saveComment: (id, body) => dispatch(editComment(id, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
