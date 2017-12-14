import React from 'react';
import Categories from './Categories';
import Posts from './Posts';
import ErrorBoundary from './ErrorBoundary';
import { Link } from 'react-router-dom';

function MainView(props) {
  return (
    <div className="default-view">
      <Categories />
      <ErrorBoundary>
        <Posts />
      </ErrorBoundary>
      <div className="create-post">
        <Link to="/create">Create new post</Link>
      </div>
    </div>
  );
}

export default MainView;
