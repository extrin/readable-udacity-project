import React from 'react';
import { connect } from 'react-redux';
import { updateSortingMethod } from '../Actions/Post';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CustomCard from './CustomCard';

class Posts extends React.Component {
  selectOptions = [
    { name: 'Vote score (asc.)', value: 'Vote score (asc.)' },
    { name: 'Vote score (desc.)', value: 'Vote score (desc.)' },
    { name: 'Timestamp (asc).', value: 'Timestamp (asc).' },
    { name: 'Timestamp (desc.)', value: 'Timestamp (desc.)' }
  ];

  render() {
    const { posts, category, sortingMethodId, changeSorting } = this.props;

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
            <CustomCard key={post.id} mode="post" id={post.id} />
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
  changeSorting: option => dispatch(updateSortingMethod(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
