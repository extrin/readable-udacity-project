import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const selectOptions = [
  { name: 'Vote score (asc.)', value: 'Vote score (asc.)' },
  { name: 'Vote score (desc.)', value: 'Vote score (desc.)' },
  { name: 'Timestamp (asc).', value: 'Timestamp (asc).' },
  { name: 'Timestamp (desc.)', value: 'Timestamp (desc.)' }
];

function trim(str) {
  return str.length > 255 ? str.slice(0, 16) + '...' : str;
}

function Posts(props) {
  const { posts, category } = props;
  const filteredPosts = category
    ? posts.filter(post => post.category === category.name)
    : posts;
  return (
    <div className="posts">
      <h1>Posts</h1>
      <div className="posts-sort">
        Sort by...
        <select className="sort-select">
          {selectOptions.map(opt => (
            <option value={opt.value} key={opt.name}>
              {opt.value}
            </option>
          ))}
        </select>
      </div>
      <div className="posts-list">
        {filteredPosts.map(post => (
          <div className="post" key={post.id}>
            <Link className="post-title" to="/:{post.category}/:{post.id}">
              {post.title}
            </Link>
            <div className="post-author">by {post.author}</div>
            <div className="post-timestamp">{post.timestamp}</div>
            <div className="voteScore">
              {post.voteScore}
              <button className="vote-up">Vote Up</button>
              <button className="vote-down">Vote Down</button>
            </div>
            <p className="post-body-cut">{trim(post.body)}</p>
            <Link
              className="post-comments-count"
              to="/:{post.category}/:{post.id}"
            >
              {post.commentCount}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  category: state.selections.selectedCategory
});

export default connect(mapStateToProps)(Posts);
