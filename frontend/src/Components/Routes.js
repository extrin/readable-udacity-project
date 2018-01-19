import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';
import NotFound from './NotFound';

class Routes extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Switch>
          <Route path="/create" component={PostCreate} />
          <Route path="/:category/:post_id/edit" component={PostEdit} />
          <Route path="/:category/:post_id" component={PostView} />
          <Route path="/:category?" component={Posts} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
