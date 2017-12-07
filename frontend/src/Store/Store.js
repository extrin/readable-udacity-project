import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../Reducers';

const store = createStore(rootReducer, compose(applyMiddleware(thunk), applyMiddleware(logger)));

export default store;
