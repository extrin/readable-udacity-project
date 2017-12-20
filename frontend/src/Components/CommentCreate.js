import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../Actions/Comment';

class CommentCreate extends Component {
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
    const { author, body } = this.state;
    const { addComment, parentId } = this.props;

    return (
      <div className="comment-create">
        <input
          className="comment-author-input"
          value={author}
          onChange={event => this.updateAuthor(event.target.value)}
          type="text"
          placeholder="Comment Author"
          required
        />
        <input
          className="comment-body-input"
          value={body}
          onChange={event => this.updateBody(event.target.value)}
          type="text"
          placeholder="Comment Body"
          required
        />
        <button
          className="comment-save-btn"
          onClick={() => addComment(body, author, parentId)}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parentId: state.selections.selectedPost
});

const mapDispatchToProps = dispatch => ({
  addComment: (body, author, parentId) =>
    dispatch(createComment(body, author, parentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreate);
