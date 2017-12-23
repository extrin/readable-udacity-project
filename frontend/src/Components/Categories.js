import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCategory } from '../Actions/Category';

function Categories(props) {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <ul className="categories-list">
        {props.categories.map(cat => (
          <li key={cat.name}>
            <Link
              to={`/${cat.path}`}
              onClick={() => {
                props.openCategory(cat);
              }}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
