// Generate a unique token for storing your bookshelf data on the backend server.
let token = '545nm56r'; //localStorage.token;
// if (!token)
//   token = localStorage.token = Math.random()
//     .toString(36)
//     .substr(-8);

const headers = { Authorization: token };
const baseUrl = 'http://127.0.0.1:3001';

export const getCategories = () => {
  const endpoint = '/categories';
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
  return fetch(baseUrl + endpoint, {
    method: 'post',
    headers: headers,
    body: `id=${id}&timestamp=${timestamp}&title=${title}&body=${body}&author=${author}&category=${category}`
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
  return fetch(baseUrl + endpoint, {
    method: 'post',
    headers: headers,
    body: `option=${option}`
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
  return fetch(baseUrl + endpoint, {
    method: 'put',
    headers: headers,
    body: `title=${title}&body=${body}`
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
    method: 'delete',
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
  return fetch(baseUrl + endpoint, {
    method: 'post',
    headers: headers,
    body: `id=${id}&timestamp=${timestamp}&body=${body}&author=${author}&parentId=${postId}`
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
  return fetch(baseUrl + endpoint, {
    method: 'post',
    headers: headers,
    body: `option=${option}`
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
  return fetch(baseUrl + endpoint, {
    method: 'put',
    headers: headers,
    body: `timestamp=${timestamp}&body=${body}`
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
    method: 'delete',
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
