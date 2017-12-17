import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './Store/Store';
import { getPosts } from './Actions/Post';
import { getCategories } from './Actions/Category';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
getCategories()(store.dispatch);
getPosts()(store.dispatch);
registerServiceWorker();
