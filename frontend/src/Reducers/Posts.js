import {
  LOAD_POSTS,
  ADD_POST,
  UPDATE_POST,
  REMOVE_POST,
  VOTE_ON_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../Actions/ActionTypes';

const posts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts.reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
    case ADD_POST:
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
    case UPDATE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
      };
    case REMOVE_POST:
      const key = action.id;
      const { [key]: value, ...newState } = state;
      return newState;
    case VOTE_ON_POST:
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
    case ADD_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          commentCount: state[action.parentId].commentCount + 1
        }
      };
    case REMOVE_COMMENT:
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
};

export default posts;
