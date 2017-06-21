import { SET_SEARCH_TERM } from './action';

export function setSearchTerm (searchTerm) {
  return { type: SET_SEARCH_TERM, searchTerm: searchTerm };
}
