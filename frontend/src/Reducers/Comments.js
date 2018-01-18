import {
  LOAD_COMMENTS,
  UPDATE_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  VOTE_ON_COMMENT
} from '../Actions/ActionTypes';

const comments = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return action.comments.reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
    case ADD_COMMENT:
      const comment = {
        id: action.id,
        timestamp: action.timestamp,
        body: action.body,
        author: action.author,
        parentId: action.parentId,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      };
      return { ...state, [action.id]: comment };
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body,
          timestamp: action.timestamp
        }
      };
    case REMOVE_COMMENT:
      const key = action.id;
      const { [key]: value, ...newState } = state;
      return newState;
    case VOTE_ON_COMMENT:
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
    default:
      return state;
  }
};

export default comments;
