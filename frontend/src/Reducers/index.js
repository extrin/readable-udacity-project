import { combineReducers } from 'redux';
import * as postActions from '../Actions/Post';
import * as commentActions from '../Actions/Comment';
import * as categoryActions from '../Actions/Category';
import * as modalActions from '../Actions/Modal';

function posts(state = {}, action) {
  switch (action.type) {
    case postActions.LOAD_POSTS:
      console.log('inside reducer, load posts');
      return action.posts.reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
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
      return { ...state, [action.id]: post };
    case postActions.UPDATE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
      };
    case postActions.REMOVE_POST:
      const key = action.id;
      const { [key]: value, ...newState } = state;
      return newState;
    case postActions.VOTE_ON_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore:
            action.option === 'upVote'
              ? state[action.id].voteScore + 1
              : state[action.id].voteScore - 1
        }
      };
    case commentActions.ADD_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          commentCount: state[action.parentId].commentCount + 1
        }
      };
    case commentActions.REMOVE_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          commentCount: state[action.parentId].commentCount - 1
        }
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case commentActions.LOAD_COMMENTS:
      console.log('inside reducer, load comments');
      return action.comments.reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
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
      return { ...state, [action.id]: comment };
    case commentActions.UPDATE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body,
          timestamp: action.timestamp
        }
      };
    case commentActions.REMOVE_COMMENT:
      const key = action.id;
      const { [key]: value, ...newState } = state;
      return newState;
    case commentActions.VOTE_ON_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore:
            action.option === 'upVote'
              ? state[action.id].voteScore + 1
              : state[action.id].voteScore - 1
        }
      };
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case categoryActions.LOAD_CATEGORIES:
      console.log('inside reducer, load categories');
      return action.categories;
    default:
      return state;
  }
}

const initialSelections = {
  selectedComment: '',
  selectedSortingMethod: 'Vote score (asc.)'
};

function selections(state = initialSelections, action) {
  switch (action.type) {
    case postActions.UPDATE_SORTING_METHOD:
      return { ...state, selectedSortingMethod: action.method };
    case commentActions.SELECT_COMMENT:
      return { ...state, selectedComment: action.id };
    default:
      return state;
  }
}

function modals(
  state = { commentCreateModal: 'closed', commentEditModal: 'closed' },
  action
) {
  switch (action.type) {
    case modalActions.OPEN_COMMENT_CREATE_MODAL:
      return { ...state, commentCreateModal: 'opened' };
    case modalActions.CLOSE_COMMENT_CREATE_MODAL:
      return { ...state, commentCreateModal: 'closed' };
    case modalActions.OPEN_COMMENT_EDIT_MODAL:
      return { ...state, commentEditModal: 'opened' };
    case modalActions.CLOSE_COMMENT_EDIT_MODAL:
      return { ...state, commentEditModal: 'closed' };
    default:
      return state;
  }
}

function loading(
  state = {
    postsLoaded: false,
    categoriesLoaded: false,
    commentsLoaded: false
  },
  action
) {
  switch (action.type) {
    case postActions.LOAD_POSTS:
      return { ...state, postsLoaded: true };
    case categoryActions.LOAD_CATEGORIES:
      return { ...state, categoriesLoaded: true };
    case commentActions.LOAD_COMMENTS:
      return { ...state, commentsLoaded: true };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  selections,
  modals,
  loading
});
