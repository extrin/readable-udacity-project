import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from '../Actions/Post';
import { connect } from 'react-redux';

class PostCreate extends Component {
  state = { postTitle: '', postBody: '', postCategory: '', postAuthor: '' };

  updateTitle = title => {
    this.setState({ postTitle: title });
  };

  updateBody = body => {
    this.setState({ postBody: body });
  };

  updateCategory = cat => {
    this.setState({ postCategory: cat });
  };

  updateAuthor = author => {
    this.setState({ postAuthor: author });
  };

  render() {
    const { categories, savePost } = this.props;
    const { postTitle, postBody, postCategory, postAuthor } = this.state;
    return (
      <div className="post-create">
        <input
          type="text"
          value={postTitle}
          onChange={event => this.updateTitle(event.target.value)}
          placeholder="Post title..."
          required
        />
        <textarea
          value={postBody}
          onChange={event => this.updateBody(event.target.value)}
          placeholder="Post body..."
          required
        />
        <select
          className="post-category-select"
          onChange={event => this.updateCategory(event.target.value)}
        >
          <option disabled value="Select category">
            Select category
          </option>
          {categories.map(cat => (
            <option key={cat.path} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={postAuthor}
          onChange={event => this.updateAuthor(event.target.value)}
          placeholder="Author nickname"
          required
        />
        <button
          className="post-save-btn"
          onClick={() => {
            console.log(postTitle, postBody, postCategory, postAuthor);
            savePost(postTitle, postBody, postCategory, postAuthor);
          }}
        >
          <Link to="/">Save</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  savePost: (title, body, author, category) => {
    console.log(title, body, author, category);
    dispatch(createPost(title, body, author, category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
