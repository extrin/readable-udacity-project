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
    const { title, body, category, author } = this.state;
    return (
      <div className="post-create">
        <Link to="/">Home</Link>
        <input
          type="text"
          value={title}
          onChange={event => this.updateTitle(event.target.value)}
          placeholder="Post title..."
          required
        />
        <textarea
          value={body}
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
            <option key={cat.name} value={cat.value}>
              {cat.value}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={author}
          onChange={event => this.updateAuthor(event.target.value)}
          placeholder="Author nickname"
          required
        />
        <button
          className="post-save-btn"
          onClick={() => savePost(title, body, author, category)}
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
  savePost: (title, body, author, category) =>
    dispatch(createPost(title, body, author, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
