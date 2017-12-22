import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectPost,
  changeVotescore,
  updateSortingMethod,
  deletePost
} from '../Actions/Post';
import { getComments } from '../Actions/Comment';

class Posts extends Component {
  selectOptions = [
    { name: 'Vote score (asc.)', value: 'Vote score (asc.)' },
    { name: 'Vote score (desc.)', value: 'Vote score (desc.)' },
    { name: 'Timestamp (asc).', value: 'Timestamp (asc).' },
    { name: 'Timestamp (desc.)', value: 'Timestamp (desc.)' }
  ];

  trim = str => {
    return str.length > 255 ? str.slice(0, 16) + '...' : str;
  };

  render() {
    const {
      posts,
      category,
      sortingMethodId,
      openPost,
      upVote,
      downVote,
      changeSorting,
      removePost
    } = this.props;

    const filteredPosts = category
      ? posts.filter(post => post.category === category.name)
      : posts;

    return (
      <div className="posts">
        <h1>Posts</h1>
        <div className="posts-sort">
          Sort by...
          <select
            className="sort-select"
            value={
              this.selectOptions.filter(opt => opt.id === sortingMethodId).value
            }
            onChange={event => changeSorting(event.target.value)}
          >
            {this.selectOptions.map(opt => (
              <option value={opt.value} key={opt.name}>
                {opt.value}
              </option>
            ))}
          </select>
        </div>
        <div className="posts-list">
          {filteredPosts.map(post => (
            <div className="post" key={post.id}>
              <Link
                className="post-title"
                to={`/${post.category}/${post.id}`}
                onClick={() => openPost(post.id)}
              >
                {post.title}
              </Link>
              <Link
                className="post-edit-link"
                to={`/${post.category}/${post.id}/edit`}
                onClick={() => openPost(post.id)}
              >
                Edit
              </Link>
              <button
                className="post-delete-btn"
                onClick={() => removePost(post.id)}
              >
                Delete
              </button>
              <div className="post-author">by {post.author}</div>
              <div className="post-timestamp">{post.timestamp}</div>
              <div className="voteScore">
                {post.voteScore}
                <button className="vote-up" onClick={() => upVote(post.id)}>
                  Vote Up
                </button>
                <button className="vote-down" onClick={() => downVote(post.id)}>
                  Vote Down
                </button>
              </div>
              <p className="post-body-cut">{this.trim(post.body)}</p>
              <Link
                className="post-comments-count"
                to={`/${post.category}/${post.id}`}
                onClick={() => {
                  console.log(post.id);
                  openPost(post.id);
                }}
              >
                {post.commentCount}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  category: state.selections.selectedCategory,
  sortingMethodId: state.selections.selectedSortingMethod
});

const mapDispatchToProps = dispatch => ({
  openPost: id => {
    dispatch(selectPost(id));
    dispatch(getComments(id));
  },
  upVote: id => dispatch(changeVotescore(id, 'upVote')),
  downVote: id => dispatch(changeVotescore(id, 'downVote')),
  changeSorting: option => dispatch(updateSortingMethod(option)),
  removePost: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
