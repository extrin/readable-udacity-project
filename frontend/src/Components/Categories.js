import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

function Categories(props) {
  return (
    <List>
      <Subheader>Categories</Subheader>
      <ListItem primaryText="All" containerElement={<Link to="/" />} />
      {props.categories.map(cat => (
        <ListItem
          key={cat.name}
          primaryText={cat.name}
          containerElement={<Link to={`/${cat.path}`} />}
        />
      ))}
    </List>
  );
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(mapStateToProps)(Categories);
