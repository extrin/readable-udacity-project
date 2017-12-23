import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Home from 'material-ui/svg-icons/action/home';
//import '../App.css';
import MainView from './MainView';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="app">
            <AppBar
              title={'Readable'}
              iconElementLeft={
                <Link to="/">
                  <Home />
                </Link>
              }
            />
            <Route exact path="/" component={MainView} />
            <Switch>
              <Route exact path="/create" component={PostCreate} />
              <Route exact path="/:category" component={MainView} />
            </Switch>
            <Route exact path="/:category/:post_id" component={PostView} />
            <Route exact path="/:category/:post_id/edit" component={PostEdit} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
