import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../Actions/Comment';
import { closeCommentEditModal } from '../Actions/Modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentEdit extends Component {
  state = { body: this.props.body, bodyValid: true, formValid: true };

  updateBody = commentBody => {
    this.setState({ body: commentBody }, this.validateForm(commentBody));
  };

  validateForm = value => {
    const bodyValid = value ? value.length > 0 : false;
    this.setState({
      bodyValid: bodyValid,
      formValid: bodyValid
    });
  };

  render() {
    const { author, id, saveComment, closeModal } = this.props;
    const { body, bodyValid, formValid } = this.state;
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
          errorText={!bodyValid && 'This field is required'}
          value={body}
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
          onClick={() => saveComment(id, body)}
          secondary={true}
          label="SAVE"
          disabled={!formValid}
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
