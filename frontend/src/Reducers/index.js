import { combineReducers } from 'redux';
import * from '../Actions'

function posts(state={},action) {
  switch (action.type) {
    case ADD_POST:
      return {};
    case UPDATE_POST:
      return {};
    case REMOVE_POST:
      return {};
    case VOTE_ON_POST:
      return {};
    default:
      return state;
  }
}

function comments(state={}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {};
    case UPDATE_COMMENT:
      return {};
    case REMOVE_COMMENT:
      return {};
    case VOTE_ON_COMMENT:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
