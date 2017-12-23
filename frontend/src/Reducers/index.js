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
        voteScore: 1,
        deleted: false,
        commentCount: 0
      };
      return state.concat([post]);
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
      return action.comments;
    case commentActions.ADD_COMMENT:
      const comment = {
        id: action.id,
        timestamp: action.timestamp,
        body: action.body,
        author: action.author,
        parentId: action.parentId,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      };
      return state.concat([comment]);
    case commentActions.UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.id) {
          comment.body = action.body;
          comment.timestamp = action.timestamp;
        }
        return comment;
      });
    case commentActions.REMOVE_COMMENT:
      return state.filter(comment => comment.id !== action.id);
    case commentActions.VOTE_ON_COMMENT:
      return state.map(comment => {
        if (comment.id === action.id) {
          if (action.option === 'downVote') comment.voteScore--;
          else comment.voteScore++;
        }
        return comment;
      });
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

function selections(state = {}, action) {
  switch (action.type) {
    case categoryActions.SELECT_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case postActions.SELECT_POST:
      return { ...state, selectedPost: action.id };
    case postActions.UPDATE_SORTING_METHOD:
      return { ...state, selectedSortingMethod: action.method };
    case commentActions.SELECT_COMMENT:
      return { ...state, selectComment: action.id };
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
