export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const VOTE_ON_POST = 'VOTE_ON_POST';

export function loadPosts() {
  return {
    type: LOAD_POSTS
  }
}

export function addPost({ id, timestamp, title, body, author, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  };
}

export function updatePost({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  };
}

export function removePost({ id }) {
  return {
    type: REMOVE_POST,
    id
  };
}

export function voteOnPost({ id, option }) {
  return {
    type: VOTE_ON_POST,
    id,
    option
  };
}
