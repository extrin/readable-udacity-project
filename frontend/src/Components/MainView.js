import React from 'react';
import Categories from './Categories';
import Posts from './Posts';
import ErrorBoundary from './ErrorBoundary';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

function MainView(props) {
  return (
    <div className="default-view">
      <ErrorBoundary>
        <Categories />
        <Posts />
      </ErrorBoundary>
      <FloatingActionButton className="create-post" href="/create">
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
}

export default MainView;
