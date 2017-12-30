export const OPEN_COMMENT_CREATE_MODAL = 'OPEN_COMMENT_CREATE_MODAL';
export const CLOSE_COMMENT_CREATE_MODAL = 'CLOSE_COMMENT_CREATE_MODAL';
export const OPEN_COMMENT_EDIT_MODAL = 'OPEN_COMMENT_EDIT_MODAL';
export const CLOSE_COMMENT_EDIT_MODAL = 'CLOSE_COMMENT_EDIT_MODAL';

export const openCommentCreateModal = () => {
  return {
    type: OPEN_COMMENT_CREATE_MODAL
  };
};

export const closeCommentCreateModal = () => {
  return {
    type: CLOSE_COMMENT_CREATE_MODAL
  };
};

export const openCommentEditModal = () => {
  return {
    type: OPEN_COMMENT_EDIT_MODAL
  };
};

export const closeCommentEditModal = () => {
  return {
    type: CLOSE_COMMENT_EDIT_MODAL
  };
};

