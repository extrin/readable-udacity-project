import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../Actions/Post';
import { Link } from 'react-router-dom';

class PostEdit extends Component {
  state = { postTitle: '', postBody: '' };

  updateTitle = title => {
    this.setState({ postTitle: title });
  };

  updateBody = body => {
    this.setState({ postBody: body });
  };

  render() {
    const { title, body } = this.state;
    const { post, savePost } = this.props;
    return (
      <div className="post-edit">
        <Link to="/">Home</Link>
        <input
          type="text"
          value={post.title || title}
          onChange={event => this.updateTitle(event.target.value)}
          placeholder="Post title..."
          required
        />
        <textarea
          value={post.body || body}
          onChange={event => this.updateBody(event.target.value)}
          placeholder="Post body..."
          required
        />
        <p className="post-category">Category: {post.category}</p>
        <p className="post-author">Author nickname: {post.author}</p>
        <button
          className="post-save-btn"
          onClick={() => savePost(post.id, title, body)}
        >
          <Link to="/">Save</Link>
        </button>
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
