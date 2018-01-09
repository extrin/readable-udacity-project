import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../Actions/Post';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class PostEdit extends Component {
  state = { postTitle: this.props.post.title, postBody: this.props.post.body };

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
            value={postTitle}
            onChange={event => this.updateTitle(event.target.value)}
            hintText="Post title"
            errorText={this.value === '' && 'This field is required.'}
            required
          />
          <TextField
            className="post-body"
            value={postBody}
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
            style={{ marginTop: '20px', marginBottom: '10px' }}
            className="post-save-btn"
            onClick={() => savePost(post.id, postTitle, postBody)}
            containerElement={<Link to={`/${post.category}/${post.id}`} />}
            label="SAVE"
            primary={true}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts[props.match.params.post_id]
});

const mapDispatchToProps = dispatch => ({
  savePost: (id, title, body) => dispatch(editPost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
