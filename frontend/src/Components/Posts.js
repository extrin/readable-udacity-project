import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSortingMethod } from '../Actions/Post';
import sortBy from 'sort-by';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CustomCard from './CustomCard';

class Posts extends React.Component {
  selectOptions = [
    { value: 'Vote score (asc.)', option: 'voteScore' },
    { value: 'Vote score (desc.)', option: '-voteScore' },
    { value: 'Timestamp (asc).', option: 'timestamp' },
    { value: 'Timestamp (desc.)', option: '-timestamp' },
    { value: 'Comment count (asc.)', option: 'commentCount' },
    { value: 'Comment count (desc.)', option: '-commentCount' }
  ];

  renderPostsList = sortedPosts => {
    if (sortedPosts.length > 0)
      return (
        <div className="posts-list">
          {sortedPosts.map(post => (
            <CustomCard key={post.id} mode="post" id={post.id} />
          ))}
        </div>
      );
    else
      return (
        <div className="posts-list">
          <p>Sorry, there are no posts in selected category</p>
        </div>
      );
  };

  render() {
    const { posts, category, sortingMethod, updateSortingMethod } = this.props;
    const sortingOption = this.selectOptions.find(
      opt => opt.value === sortingMethod
    ).option;

    const filteredPosts = category
      ? posts.filter(post => post.category === category)
      : posts;

    const sortedPosts = filteredPosts.sort(sortBy(sortingOption));

    return (
      <div className="default-view">
        <div className="posts">
          <div className="posts-sort">
            <SelectField
              fullWidth={true}
              floatingLabelText="Sort by..."
              className="sort-select"
              value={
                this.selectOptions.find(opt => opt.value === sortingMethod)
                  .value
              }
              onChange={(event, key, payload) => updateSortingMethod(payload)}
            >
              {this.selectOptions.map(opt => (
                <MenuItem
                  value={opt.value}
                  key={opt.value}
                  primaryText={opt.value}
                />
              ))}
            </SelectField>
          </div>
          {this.renderPostsList(sortedPosts)}
        </div>
        <FloatingActionButton
          className="create-post"
          containerElement={
            <Link
              to="/create"
              style={{ textDecoration: 'none', color: 'white' }}
            />
          }
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: Object.values(state.posts),
  category: props.match.params.category,
  sortingMethod: state.selections.selectedSortingMethod
});

export default connect(mapStateToProps, { updateSortingMethod })(Posts);
