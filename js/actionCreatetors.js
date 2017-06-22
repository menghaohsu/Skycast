import { SET_SEARCH_TERM, SUBMIT_SEARCH, RESET_SEARCH_STATUS } from './action';

export function setSearchTerm (searchTerm) {
  return { type: SET_SEARCH_TERM, searchTerm: searchTerm };
}

export function submitSearch () {
  return { type: SUBMIT_SEARCH };
}

export function resetSearchStatus () {
  return { type: RESET_SEARCH_STATUS };
}
