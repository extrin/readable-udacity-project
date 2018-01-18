import * as API from '../Util/api';
import uuid from 'uuid/v1';
import {
  LOAD_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
  VOTE_ON_COMMENT,
  SELECT_COMMENT
} from './ActionTypes';

export const loadComments = (postId, comments) => {
  return {
    type: LOAD_COMMENTS,
    postId,
    comments
  };
};

export const getComments = postId => dispatch => {
  return API.getComments(postId).then(res =>
    dispatch(loadComments(postId, res))
  );
};

export const addComment = (id, timestamp, body, author, parentId) => {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  };
};

export const createComment = (body, author, parentId) => dispatch => {
  const uid = uuid();
  const timestamp = Date.now();
  return API.createComment(parentId, uid, timestamp, author, body).then(
    dispatch(addComment(uid, timestamp, body, author, parentId))
  );
};

export const updateComment = (id, timestamp, body) => {
  return {
    type: UPDATE_COMMENT,
    id,
    timestamp,
    body
  };
};

export const editComment = (id, body) => dispatch => {
  const timestamp = Date.now();
  return API.updateComment(id, timestamp, body).then(
    dispatch(updateComment(id, timestamp, body))
  );
};

export const removeComment = (id, parentId) => {
  return {
    type: REMOVE_COMMENT,
    id,
    parentId
  };
};

export const deleteComment = (id, parentId) => dispatch => {
  return API.deleteComment(id).then(dispatch(removeComment(id, parentId)));
};

export const voteOnComment = (id, option) => {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option
  };
};

export const changeCommentVotescore = (id, option) => dispatch => {
  return API.voteOnComment(id, option).then(
    dispatch(voteOnComment(id, option))
  );
};

export const selectComment = id => {
  return { type: SELECT_COMMENT, id };
};
