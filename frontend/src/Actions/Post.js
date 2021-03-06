import * as API from '../Util/api';
import uuid from 'uuid/v1';
import {
  LOAD_POSTS,
  ADD_POST,
  UPDATE_POST,
  REMOVE_POST,
  VOTE_ON_POST,
  UPDATE_SORTING_METHOD
} from './ActionTypes';

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const getPosts = () => dispatch => {
  return API.getPosts().then(posts => dispatch(loadPosts(posts)));
};

export const addPost = (id, timestamp, title, body, author, category) => {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  };
};

export const createPost = (title, body, author, category) => dispatch => {
  const uid = uuid();
  const timestamp = Date.now();
  return API.createPost(uid, timestamp, title, body, author, category).then(
    dispatch(addPost(uid, timestamp, title, body, author, category))
  );
};

export const updatePost = (id, title, body) => {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  };
};

export const editPost = (id, title, body) => dispatch => {
  return API.updatePost(id, title, body).then(
    dispatch(updatePost(id, title, body))
  );
};

export const removePost = id => {
  return {
    type: REMOVE_POST,
    id
  };
};

export const deletePost = id => dispatch => {
  return API.deletePost(id).then(dispatch(removePost(id)));
};

export const voteOnPost = (id, option) => {
  return {
    type: VOTE_ON_POST,
    id,
    option
  };
};

export const changePostVotescore = (id, option) => dispatch => {
  return API.voteOnPost(id, option).then(dispatch(voteOnPost(id, option)));
};

export const updateSortingMethod = method => {
  return {
    type: UPDATE_SORTING_METHOD,
    method
  };
};
