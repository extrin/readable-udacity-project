import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../Actions/Comment';
import { closeCommentEditModal } from '../Actions/Modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentEdit extends Component {
  state = { body: this.props.body };

  updateBody = commentBody => {
    this.setState({ body: commentBody });
  };

  render() {
    const { author, id, saveComment, closeModal } = this.props;

    return (
      <div className="comment-edit">
        <p>
          Author: <strong>{author}</strong>
        </p>
        <TextField
          className="comment-body-input"
          multiLine={true}
          rows={5}
          floatingLabelText="Edit your comment here"
          hintText="Your comment"
          errorText={this.state.body === '' && 'This field is required'}
          value={this.state.body}
          onChange={event => this.updateBody(event.target.value)}
          required
        />
        <RaisedButton
          className="cancel-btn"
          onClick={() => closeModal()}
          label="CANCEL"
        />
        <RaisedButton
          className="comment-save-btn"
          onClick={() => saveComment(id, this.state.body)}
          secondary={true}
          label="SAVE"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const comment = state.comments[state.selections.selectedComment];
  return {
    author: comment.author,
    body: comment.body,
    id: comment.id
  };
};

const mapDispatchToProps = dispatch => ({
  saveComment: (id, body) => {
    dispatch(editComment(id, body));
    dispatch(closeCommentEditModal());
  },
  closeModal: () => dispatch(closeCommentEditModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
