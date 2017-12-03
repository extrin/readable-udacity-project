// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};
const baseUrl = 'http://127.0.0.1:3001';

export function getCategories() {
  const endpoint = '/categories';
  return fetch(baseUrl + endpoint, {
    headers
  }).then(res => res.json());
}

export function getPostsForCategory(category) {
  const endpoint = `/:${category}/posts`;
  return fetch(baseUrl + endpoint, {
    headers
  }).then(res => res.json());
}

export function getPosts() {
  const endpoint = '/posts';
  return fetch(baseUrl + endpoint, {
    headers
  }).then(res => res.json());
}
