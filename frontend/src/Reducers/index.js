import { combineReducers } from 'redux';
import categories from './Categories';
import comments from './Comments';
import loading from './Loading';
import modals from './Modals';
import posts from './Posts';
import selections from './Selections';

export default combineReducers({
  posts,
  comments,
  categories,
  selections,
  modals,
  loading
});
