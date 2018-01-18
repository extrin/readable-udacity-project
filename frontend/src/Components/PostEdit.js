import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../Actions/Post';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

class PostEdit extends Component {
  state = { postTitle: '', postBody: '' };

  updateTitle = title => {
    this.setState({ postTitle: title });
  };

  updateBody = body => {
    this.setState({ postBody: body });
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.postsLoaded === true &&
      this.state.postTitle === '' &&
      this.state.postBody === ''
    ) {
      this.updateBody(nextProps.post.body);
      this.updateTitle(nextProps.post.title);
    }
  };

  componentWillMount = () => {
    if (
      this.props.postsLoaded === true &&
      this.state.postTitle === '' &&
      this.state.postBody === ''
    ) {
      this.updateBody(this.props.post.body);
      this.updateTitle(this.props.post.title);
    }
  };

  render() {
    const { postTitle, postBody } = this.state;
    const { post, editPost, postsLoaded } = this.props;

    return (
      <div className="post-edit">
        {postsLoaded === true ? (
          <Paper zDepth={2}>
            <TextField
              className="post-title"
              style={{ width: '95%' }}
              value={postTitle}
              onChange={event => this.updateTitle(event.target.value)}
              hintText="Post title"
              errorText={postTitle === '' && 'This field is required.'}
              required
            />
            <TextField
              className="post-body"
              value={postBody}
              style={{ width: '95%' }}
              onChange={event => this.updateBody(event.target.value)}
              hintText="Post body"
              errorText={postBody === '' && 'This field is required.'}
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
              onClick={() => editPost(post.id, postTitle, postBody)}
              containerElement={<Link to={`/${post.category}/${post.id}`} />}
              label="SAVE"
              primary={true}
            />
          </Paper>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts[props.match.params.post_id],
  postsLoaded: state.loading.postsLoaded
});

export default connect(mapStateToProps, { editPost })(PostEdit);
