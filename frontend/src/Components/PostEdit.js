import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../Actions/Post';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostEdit extends Component {
  state = { postTitle: '', postBody: '' };

  updateTitle = title => {
    this.setState({ postTitle: title });
  };

  updateBody = body => {
    this.setState({ postBody: body });
  };

  render() {
    const { postTitle, postBody } = this.state;
    const { post, savePost } = this.props;
    return (
      <div className="post-edit">
        <Paper zDepth={2}>
          <TextField
            className="post-title"
            style={{ width: '95%' }}
            value={post.title || postTitle}
            onChange={event => this.updateTitle(event.target.value)}
            hintText="Post title"
            errorText={this.value === '' && 'This field is required.'}
            required
          />
          <TextField
            className="post-body"
            value={post.body || postBody}
            style={{ width: '95%' }}
            onChange={event => this.updateBody(event.target.value)}
            hintText="Post body"
            errorText={this.value === '' && 'This field is required.'}
            floatingLabelText="Write your post here"
            multiLine={true}
            rows={10}
            required
          />
          <p className="post-category">Category: {post.category}</p>
          <p className="post-author">Author nickname: {post.author}</p>
          <RaisedButton
            style={{ marginTop: '20px' }}
            className="post-save-btn"
            onClick={() => savePost(post.id, postTitle, postBody)}
            label="SAVE"
            href="/"
            primary={true}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.find(post => post.id === state.selections.selectedPost)
});

const mapDispatchToProps = dispatch => ({
  savePost: (id, title, body) => dispatch(editPost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
