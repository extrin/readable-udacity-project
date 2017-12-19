import { combineReducers } from 'redux';
import * as postActions from '../Actions/Post';
import * as commentActions from '../Actions/Comment';
import * as categoryActions from '../Actions/Category';

function posts(state = [], action) {
  switch (action.type) {
    case postActions.LOAD_POSTS:
      return action.posts;
    case postActions.ADD_POST:
      const post = {
        id: action.id,
        timestamp: action.timestamp,
        title: action.title,
        body: action.body,
        author: action.author,
        category: action.category,
        voteScore: 0,
        deleted: false,
        commentCount: 0
      };
      return { ...state, [state.length]: post };
    case postActions.UPDATE_POST:
      return state.map(post => {
        if (post.id === action.id) {
          post.title = action.id;
          post.body = action.body;
        }
        return post;
      });
    case postActions.REMOVE_POST:
      return state.filter(post => post.id !== action.id);
    case postActions.VOTE_ON_POST:
      return state.map(post => {
        if (post.id === action.id) {
          if (action.option === 'downVote') post.voteScore--;
          else post.voteScore++;
        }
        return post;
      });
    default:
      return state;
  }
}

function comments(state = [], action) {
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

function categories(state = [], action) {
  switch (action.type) {
    case categoryActions.LOAD_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

const initialSelections = {
  selectedCategory: '',
  selectedPost: ''
};

function selections(state = initialSelections, action) {
  switch (action.type) {
    case categoryActions.SELECT_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case postActions.SELECT_POST:
      return { ...state, selectedPost: action.post };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  selections
});
