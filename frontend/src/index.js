import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.css';
import App from './Components/App';
import { Provider } from 'react-redux';
import store from './Store/Store';
import { getPosts } from './Actions/Post';
import { getCategories } from './Actions/Category';

getCategories()(store.dispatch);
getPosts()(store.dispatch);

ReactModal.setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
