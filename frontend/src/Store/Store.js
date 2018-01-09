import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../Reducers';
import { getPosts } from '../Actions/Post';
import { getCategories } from '../Actions/Category';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk, logger))
);

store.dispatch(getCategories());
store.dispatch(getPosts());

export default store;
