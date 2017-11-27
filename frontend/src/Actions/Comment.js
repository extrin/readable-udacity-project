export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';

export function addComment({ id, timestamp, body, author, parentId }) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  };
}

export function updateComment({ id, timestamp, body }) {
  return {
    type: UPDATE_COMMENT,
    id,
    timestamp,
    body
  };
}

export function removeComment({ id }) {
  return {
    type: REMOVE_COMMENT,
    id
  };
}

export function voteOnComment({ id, option }) {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option
  };
}
