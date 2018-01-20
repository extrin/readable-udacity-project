import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../Actions/Post';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

class PostEdit extends Component {
  state = {
    postTitle: '',
    postBody: '',
    titleValid: true,
    bodyValid: true,
    formValid: true
  };

  handleUserInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, this.validateField(name, value));
  };

  validateField = (name, value) => {
    let { titleValid, bodyValid } = this.state;
    switch (name) {
      case 'postTitle':
        titleValid = value ? value.length > 0 : false;
        break;
      case 'postBody':
        bodyValid = value ? value.length > 0 : false;
        break;
      default:
        break;
    }
    this.setState({
      titleValid: titleValid,
      bodyValid: bodyValid,
      formValid: titleValid && bodyValid
    });
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.postsLoaded === true &&
      this.state.postTitle === '' &&
      this.state.postBody === ''
    ) {
      this.setState({ postBody: nextProps.post.body });
      this.setState({ postTitle: nextProps.post.title });
    }
  };

  componentWillMount = () => {
    if (
      this.props.postsLoaded === true &&
      this.state.postTitle === '' &&
      this.state.postBody === ''
    ) {
      this.setState({ postBody: this.props.post.body });
      this.setState({ postTitle: this.props.post.title });
    }
  };

  render() {
    const { postTitle, postBody, titleValid, bodyValid } = this.state;
    const { post, editPost, postsLoaded } = this.props;

    return (
      <div className="post-edit">
        {postsLoaded === true ? (
          <Paper zDepth={2}>
            <TextField
              className="post-title"
              name="postTitle"
              style={{ width: '95%' }}
              value={postTitle}
              onChange={event => this.handleUserInput(event)}
              hintText="Post title"
              errorText={!titleValid && 'This field is required.'}
              required
            />
            <TextField
              className="post-body"
              name="postBody"
              value={postBody}
              style={{ width: '95%' }}
              onChange={event => this.handleUserInput(event)}
              hintText="Post body"
              errorText={!bodyValid && 'This field is required.'}
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
              containerElement={
                <Link
                  to={`/${post.category}/${post.id}`}
                  disabled={!this.state.formValid}
                />
              }
              label="SAVE"
              primary={true}
              disabled={!this.state.formValid}
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
