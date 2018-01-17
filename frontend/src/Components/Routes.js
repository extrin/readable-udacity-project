import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';
import LoadingSpinner from './LoadingSpinner';

class Routes extends React.Component {
  render() {
    return (
      <div className="app-body">
        {this.props.postsLoaded === true ? (
          <div>
            <Switch>
              <Route exact path="/create" component={PostCreate} />
              <Route exact path="/:category?" component={Posts} />
            </Switch>
            <Route exact path="/:category/:post_id" component={PostView} />
            <Route path="/:category/:post_id/edit" component={PostEdit} />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ postsLoaded: state.loading.postsLoaded });

export default connect(mapStateToProps)(Routes);
