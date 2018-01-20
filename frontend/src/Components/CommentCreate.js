import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../Actions/Comment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { closeCommentCreateModal } from '../Actions/Modal';

class CommentCreate extends React.Component {
  state = {
    commentAuthor: '',
    commentBody: '',
    authorValid: false,
    bodyValid: false,
    formValid: false
  };

  handleUserInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, this.validateField(name, value));
  };

  validateField = (name, value) => {
    let { authorValid, bodyValid } = this.state;
    switch (name) {
      case 'commentAuthor':
        authorValid = value ? value.length > 0 : false;
        break;
      case 'commentBody':
        bodyValid = value ? value.length > 0 : false;
        break;
      default:
        break;
    }
    this.setState({
      authorValid: authorValid,
      bodyValid: bodyValid,
      formValid: authorValid && bodyValid
    });
  };

  render() {
    const { commentAuthor, commentBody, authorValid, bodyValid } = this.state;
    const { addComment, parentId, closeModal } = this.props;

    return (
      <div className="comment-create">
        <TextField
          className="comment-author-input"
          name="commentAuthor"
          value={commentAuthor}
          onChange={event => this.handleUserInput(event)}
          floatingLabelText="Enter your nickname"
          hintText="Author name"
          errorText={!authorValid && 'This field is required'}
          required
        />
        <TextField
          className="comment-body-input"
          name="commentBody"
          value={commentBody}
          onChange={event => this.handleUserInput(event)}
          multiLine={true}
          rows={5}
          floatingLabelText="Enter your comment"
          hintText="Comment body"
          errorText={!bodyValid && 'This field is required'}
          required
        />
        <RaisedButton
          className="cancel-btn"
          onClick={() => closeModal()}
          label="CANCEL"
        />
        <RaisedButton
          className="comment-save-btn"
          onClick={() => addComment(commentBody, commentAuthor, parentId)}
          label="SAVE"
          secondary={true}
          disabled={!this.state.formValid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
  addComment: (body, author, parentId) => {
    dispatch(createComment(body, author, parentId));
    dispatch(closeCommentCreateModal());
  },
  closeModal: () => dispatch(closeCommentCreateModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreate);
