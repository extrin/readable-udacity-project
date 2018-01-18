import * as API from '../Util/api';
import { LOAD_CATEGORIES } from './ActionTypes';

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
