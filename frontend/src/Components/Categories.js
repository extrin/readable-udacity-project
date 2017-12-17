import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Categories(props) {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <ul className="categories-list">
        {props.categories &&
          props.categories.map(cat => (
            <li key={cat.name}>
              <Link to={`/:${cat.path}`}>{cat.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(Categories);
