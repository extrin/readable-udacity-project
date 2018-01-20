import { LOAD_POSTS, ADD_POST, REMOVE_POST } from '../Actions/ActionTypes';

const postsIds = (state = [], action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return Object.keys(
        action.posts.reduce((accumulator, current) => {
          accumulator[current.id] = current.id;
          return accumulator;
        }, {})
      );
    case ADD_POST:
      return state.concat(action.id);
    case REMOVE_POST:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

export default postsIds;
