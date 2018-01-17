import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../Actions/Comment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { closeCommentCreateModal } from '../Actions/Modal';

class CommentCreate extends React.Component {
  state = {
    commentAuthor: '',
    commentBody: ''
  };

  updateAuthor = author => {
    this.setState({ commentAuthor: author });
  };

  updateBody = body => {
    this.setState({ commentBody: body });
  };

  render() {
    const { commentAuthor, commentBody } = this.state;
    const { addComment, parentId, closeModal } = this.props;

    return (
      <div className="comment-create">
        <TextField
          className="comment-author-input"
          value={commentAuthor}
          onChange={event => this.updateAuthor(event.target.value)}
          floatingLabelText="Enter your nickname"
          hintText="Author name"
          errorText={commentAuthor === '' && 'This field is required'}
          required
        />
        <TextField
          className="comment-body-input"
          value={commentBody}
          onChange={event => this.updateBody(event.target.value)}
          multiLine={true}
          rows={5}
          floatingLabelText="Enter your comment"
          hintText="Comment body"
          errorText={commentBody === '' && 'This field is required'}
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
