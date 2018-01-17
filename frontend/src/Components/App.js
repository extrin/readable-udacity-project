import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../App.css';
import CustomAppBar from './CustomAppBar';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="app">
            <CustomAppBar />
            <Routes />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
