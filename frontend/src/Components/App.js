import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../App.css';
import CustomAppBar from './CustomAppBar';
import MainView from './MainView';
import PostCreate from './PostCreate';
import PostView from './PostView';
import PostEdit from './PostEdit';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="app">
            <CustomAppBar />
            <div className="app-body">
              <Route exact path="/" component={MainView} />
              <Switch>
                <Route exact path="/create" component={PostCreate} />
                <Route exact path="/:category" component={MainView} />
              </Switch>
              <Route exact path="/:category/:post_id" component={PostView} />
              <Route
                exact
                path="/:category/:post_id/edit"
                component={PostEdit}
              />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
