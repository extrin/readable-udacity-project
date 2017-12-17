import * as API from '../Util/api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
});

export const getCategories = () => dispatch => {
  return API.getCategories().then(categories =>
    dispatch(loadCategories(categories))
  );
};

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
});

