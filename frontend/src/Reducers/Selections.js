import { UPDATE_SORTING_METHOD, SELECT_COMMENT } from '../Actions/ActionTypes';

const initialSelections = {
  selectedComment: '',
  selectedSortingMethod: 'Vote score (asc.)'
};

const selections = (state = initialSelections, action) => {
  switch (action.type) {
    case UPDATE_SORTING_METHOD:
      return { ...state, selectedSortingMethod: action.method };
    case SELECT_COMMENT:
      return { ...state, selectedComment: action.id };
    default:
      return state;
  }
};

export default selections;
