import * as API from '../Util/api';
import uuid from 'uuid/v1';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const SELECT_COMMENT = 'SELECT_COMMENT';

export const loadComments = ({ postId, comments }) => {
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

export const addComment = ({ id, timestamp, body, author, parentId }) => {
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

export const updateComment = ({ id, timestamp, body }) => {
  return {
    type: UPDATE_COMMENT,
    id,
    timestamp,
    body
  };
};

export const editComment = (id, timestamp, body) => dispatch => {
  const timestamp = Date.now();
  return API.updateComment(id, timestamp, body).then(
    dispatch(updateComment(id, timestamp, body))
  );
};

export const removeComment = ({ id }) => {
  return {
    type: REMOVE_COMMENT,
    id
  };
};

export const deleteComment = id => dispatch => {
  return API.deleteComment(id).then(dispatch(removeComment(id)));
};

export const voteOnComment = ({ id, option }) => {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option
  };
};

export const changeVotescore = (id, option) => dispatch => {
  return API.voteOnComment(id, option).then(
    dispatch(voteOnComment(id, option))
  );
};

export const selectComment = ({ id }) => {
  return { type: SELECT_COMMENT, id };
};
