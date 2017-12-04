import { combineReducers } from 'redux';
import * as postActions from '../Actions/Post';
import * as commentActions from '../Actions/Comment';

function posts(state = {}, action) {
  switch (action.type) {
    case postActions.ADD_POST:
      return {};
    case postActions.UPDATE_POST:
      return {};
    case postActions.REMOVE_POST:
      return {};
    case postActions.VOTE_ON_POST:
      return {};
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case commentActions.ADD_COMMENT:
      return {};
    case commentActions.UPDATE_COMMENT:
      return {};
    case commentActions.REMOVE_COMMENT:
      return {};
    case commentActions.VOTE_ON_COMMENT:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
