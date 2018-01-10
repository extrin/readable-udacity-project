import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';
//import Loading from 'react-loading';
// const LoadingSpinner = () => {
//   return <Loading delay={200} type="spin" color="#222" className="loading" />;
// };

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
