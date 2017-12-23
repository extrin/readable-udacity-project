import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardActions, CardTitle, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Comment from 'material-ui/svg-icons/communication/comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

  getPostDate = timestamp => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return timestamp.toLocaleString('en-US', options);
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
          <SelectField
            floatingLabelText="Sort by..."
            className="sort-select"
            value={
              this.selectOptions.filter(opt => opt.id === sortingMethodId).value
            }
            onChange={event => changeSorting(event.target.value)}
          >
            {this.selectOptions.map(opt => (
              <MenuItem
                value={opt.value}
                key={opt.name}
                primaryText={opt.value}
              />
            ))}
          </SelectField>
        </div>
        <div className="posts-list">
          {filteredPosts.map(post => (
            <Card className="post" key={post.id}>
              <CardActions>
                <FlatButton
                  label="EDIT"
                  href={`/${post.category}/${post.id}/edit`}
                  onClick={() => openPost(post.id)}
                />
                <FlatButton
                  label="DELETE"
                  onClick={() => removePost(post.id)}
                />
              </CardActions>
              <Link
                className="post-title"
                to={`/${post.category}/${post.id}`}
                onClick={() => openPost(post.id)}
              >
                <CardTitle
                  title={post.title}
                  subtitle={`${this.getPostDate(post.timestamp)} by ${
                    post.author
                  }`}
                />
              </Link>
              <CardHeader title={post.voteScore} />
              <CardActions>
                <FlatButton
                  className="vote-up"
                  label="Vote Up"
                  onClick={() => upVote(post.id)}
                />
                <FlatButton
                  className="vote-down"
                  label="Vote Down"
                  onClick={() => downVote(post.id)}
                />
              </CardActions>
              <Link
                className="post-comments-count"
                to={`/${post.category}/${post.id}`}
                onClick={() => {
                  openPost(post.id);
                }}
              >
                <CardHeader title={post.commentCount} avatar={<Comment />} />
              </Link>
            </Card>
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
