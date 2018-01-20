import {
  OPEN_COMMENT_CREATE_MODAL,
  CLOSE_COMMENT_CREATE_MODAL,
  OPEN_COMMENT_EDIT_MODAL,
  CLOSE_COMMENT_EDIT_MODAL
} from '../Actions/ActionTypes';

const initialState = {
  commentCreateModal: 'closed',
  commentEditModal: 'closed'
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_COMMENT_CREATE_MODAL:
      return { ...state, commentCreateModal: 'opened' };
    case CLOSE_COMMENT_CREATE_MODAL:
      return { ...state, commentCreateModal: 'closed' };
    case OPEN_COMMENT_EDIT_MODAL:
      return { ...state, commentEditModal: 'opened' };
    case CLOSE_COMMENT_EDIT_MODAL:
      return { ...state, commentEditModal: 'closed' };
    default:
      return state;
  }
};

export default modals;
