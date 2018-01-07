import * as API from '../Util/api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
});

export const getCategories = () => dispatch => {
  return API.getCategories()
    .then(res => {
      const categories = res.categories;
      return categories;
    })
    .then(categories => dispatch(loadCategories(categories)));
};
