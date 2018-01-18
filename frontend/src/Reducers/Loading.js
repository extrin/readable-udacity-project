import {
  LOAD_POSTS,
  LOAD_CATEGORIES,
  LOAD_COMMENTS
} from '../Actions/ActionTypes';

const initialState = {
  postsLoaded: false,
  categoriesLoaded: false,
  commentsLoaded: ''
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, postsLoaded: true };
    case LOAD_CATEGORIES:
      return { ...state, categoriesLoaded: true };
    case LOAD_COMMENTS:
      return { ...state, commentsLoaded: action.postId };
    default:
      return state;
  }
};

export default loading;
