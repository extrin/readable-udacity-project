import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardTitle,
  CardHeader,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Comment from 'material-ui/svg-icons/communication/comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Remove from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/image/edit';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import {
  selectPost,
  changeVotescore,
  updateSortingMethod,
  deletePost
} from '../Actions/Post';
import { getComments } from '../Actions/Comment';
import { getStringDate, trim } from '../Util/Helpers';

class Posts extends Component {
  selectOptions = [
    { name: 'Vote score (asc.)', value: 'Vote score (asc.)' },
    { name: 'Vote score (desc.)', value: 'Vote score (desc.)' },
    { name: 'Timestamp (asc).', value: 'Timestamp (asc).' },
    { name: 'Timestamp (desc.)', value: 'Timestamp (desc.)' }
  ];

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
        <div className="posts-sort">
          <SelectField
            fullWidth={true}
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
                  className="vote-up"
                  icon={<ArrowUp color="red" />}
                  onClick={() => upVote(post.id)}
                />
                <FlatButton label={post.voteScore} disabled />
                <FlatButton
                  className="vote-down"
                  icon={<ArrowDown color="blue" />}
                  onClick={() => downVote(post.id)}
                />
                <FlatButton
                  icon={<Edit />}
                  containerElement={
                    <Link to={`/${post.category}/${post.id}/edit`} />
                  }
                  onClick={() => openPost(post.id)}
                />
                <FlatButton
                  icon={<Remove />}
                  onClick={() => removePost(post.id)}
                />
              </CardActions>
              <CardTitle
                title={
                  <Link
                    className="post-title"
                    style={{ textDecoration: 'none' }}
                    to={`/${post.category}/${post.id}`}
                    onClick={() => openPost(post.id)}
                  >
                    {post.title}
                  </Link>
                }
                subtitle={`${getStringDate(post.timestamp)} by ${post.author}`}
              />
              <CardText>{trim(post.body)}</CardText>
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
