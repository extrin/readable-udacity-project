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
          <Route exact path="/" render={() => <MainView />} />
          <Route path="/create" render={() => <PostCreate />} />
          <Route path="/:category" render={() => <MainView />} />
          <Route path="/:category/:post_id" render={() => <PostView />} />
        </div>
      </Router>
    );
  }
}

export default App;
