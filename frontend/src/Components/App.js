import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import MainView from './MainView';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={MainView} />
          <Route exact path="/create" component={PostCreate} />
          <Route exact path="/:category" component={MainView} />
          <Route exact path="/:category/:post_id" component={PostView} />
          <Route exact path="/:category/:post_id/edit" component={PostEdit} />
        </div>
      </Router>
    );
  }
}

export default App;
