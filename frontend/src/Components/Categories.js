import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCategory } from '../Actions/Category';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

function Categories(props) {
  return (
    <List>
      <Subheader>Categories</Subheader>
      <ListItem
        primaryText="All"
        containerElement={<Link to="/" />}
        onClick={() => props.openCategory()}
      />
      {props.categories.map(cat => (
        <ListItem
          key={cat.name}
          primaryText={cat.name}
          containerElement={<Link to={`/${cat.path}`} />}
          onClick={() => {
            props.openCategory(cat);
          }}
        />
      ))}
    </List>
  );
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  selectedCategory: state.selections.selectedCategory
});

const mapDispatchToProps = dispatch => ({
  openCategory: category => dispatch(selectCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
