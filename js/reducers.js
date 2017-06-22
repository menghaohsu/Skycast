import { SET_SEARCH_TERM, SUBMIT_SEARCH, RESET_SEARCH_STATUS } from './action';

const DEFAULT_STATE = {
  searchTerm: '',
  isSubmitted: false
};

const setSearchTerm = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { searchTerm: action.searchTerm });
  return newState;
};

const submitSearch = (state, action) => {
  const newState = {};

  Object.assign(newState, state, { isSubmitted: true });

  return newState;
};

const resetSubmitStatue = (state, action) => {
  const newState = {};

  Object.assign(newState, state, { isSubmitted: false });

  return newState;
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    case SUBMIT_SEARCH:
      return submitSearch(state, action);
    case RESET_SEARCH_STATUS:
      return resetSubmitStatue(state, action);
    default:
      return state;
  }
};

export default rootReducer;
