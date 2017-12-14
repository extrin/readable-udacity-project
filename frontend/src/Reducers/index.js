import { combineReducers } from 'redux';
import * as postActions from '../Actions/Post';
import * as commentActions from '../Actions/Comment';

function posts(state = {}, action) {
  switch (action.type) {
    case postActions.LOAD_POSTS:
      return { ...state, [posts]: action.posts };
    case postActions.ADD_POST:
      return state;
    case postActions.UPDATE_POST:
      return state;
    case postActions.REMOVE_POST:
      return state;
    case postActions.VOTE_ON_POST:
      return state;
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case commentActions.LOAD_COMMENTS:
      return state;
    case commentActions.ADD_COMMENT:
      return state;
    case commentActions.UPDATE_COMMENT:
      return state;
    case commentActions.REMOVE_COMMENT:
      return state;
    case commentActions.VOTE_ON_COMMENT:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
