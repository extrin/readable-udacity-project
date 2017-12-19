import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import logo from '../logo.svg';
import '../App.css';
import MainView from './MainView';
import PostCreate from './PostCreate';
import PostView from './PostView';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={MainView} />
          <Route exact path="/create" component={PostCreate} />
          <Route exact path="/:category" component={MainView} />
          <Route exact path="/:category/:post_id" component={PostView} />
        </div>
      </Router>
    );
  }
}

export default App;
