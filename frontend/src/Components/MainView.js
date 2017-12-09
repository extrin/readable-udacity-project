import React from 'react';
import Categories from './Categories';
import Posts from './Posts';
import { Link } from 'react-router-dom';

function MainView(props) {
  return (
    <div className="default-view">
      <Categories />
      <Posts />
      <div className="create-post">
        <Link to="/create">Create new post</Link>
      </div>
    </div>
  );
}

export default MainView;
