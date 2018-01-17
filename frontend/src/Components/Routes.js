import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';

class Routes extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Switch>
          <Route exact path="/create" component={PostCreate} />
          <Route exact path="/:category?" component={Posts} />
        </Switch>
        <Route exact path="/:category/:post_id" component={PostView} />
        <Route path="/:category/:post_id/edit" component={PostEdit} />
      </div>
    );
  }
}

export default Routes;
