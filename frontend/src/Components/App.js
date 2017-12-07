import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import logo from '../logo.svg';
import '../App.css';
import MainView from './MainView';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() => <MainView />} />
        </div>
      </Router>
    );
  }
}

export default App;
