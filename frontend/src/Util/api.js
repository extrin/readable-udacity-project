// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token,
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const baseUrl = 'http://127.0.0.1:3001';

export const getCategories = () => {
  const endpoint = '/categories';
  console.log('fetch categories');
  return fetch(baseUrl + endpoint, { headers: headers }).then(res =>
    res.json()
  );
};

export const getPostsForCategory = category => {
  const endpoint = `/${category}/posts`;
  return fetch(baseUrl + endpoint, { headers }).then(res => res.json());
};

export const getPosts = () => {
  const endpoint = '/posts';
  console.log('fetch posts');
  return fetch(baseUrl + endpoint, { headers: headers }).then(res =>
    res.json()
  );
};

export const getPost = id => {
  const endpoint = `/posts/${id}`;
  return fetch(baseUrl + endpoint, { headers }).then(res => res.json());
};

export const createPost = (id, timestamp, title, body, author, category) => {
  const endpoint = '/posts';
  const data = JSON.stringify({
    id: id,
    timestamp: timestamp,
    title: title,
    body: body,
    author: author,
    category: category
  });
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const voteOnPost = (id, option) => {
  const endpoint = `/posts/${id}`;
  const data = JSON.stringify({ option: option });
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const updatePost = (id, title, body) => {
  const endpoint = `/posts/${id}`;
  const data = JSON.stringify({ title: title, body: body });
  return fetch(baseUrl + endpoint, {
    method: 'PUT',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const deletePost = id => {
  const endpoint = `/posts/${id}`;
  return fetch(baseUrl + endpoint, {
    method: 'DELETE',
    headers: headers
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const getComments = postId => {
  const endpoint = `/posts/${postId}/comments`;
  return fetch(baseUrl + endpoint, { headers }).then(res => res.json());
};

export const getComment = id => {
  const endpoint = `/comments/${id}`;
  return fetch(baseUrl + endpoint, { headers }).then(res => res.json());
};

export const createComment = (postId, id, timestamp, author, body) => {
  const endpoint = '/comments';
  const data = JSON.stringify({
    id: id,
    timestamp: timestamp,
    body: body,
    author: author,
    parentId: postId
  });
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const voteOnComment = (id, option) => {
  const endpoint = `/comments/${id}`;
  const data = JSON.stringify({ option: option });
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const updateComment = (id, timestamp, body) => {
  const endpoint = `/comments/${id}`;
  const data = JSON.stringify({ timestamp: timestamp, body: body });
  return fetch(baseUrl + endpoint, {
    method: 'PUT',
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};

export const deleteComment = id => {
  const endpoint = `/comments/${id}`;
  return fetch(baseUrl + endpoint, {
    method: 'DELETE',
    headers: headers
  })
    .then(res => res.json())
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
};
