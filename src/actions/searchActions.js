import { SEARCH_REQUEST, SEARCH_RESPONSE, SEARCH_CLEAR } from '../constants/actionTypes'

function startSearchRequest (query) {
  return {
    type: SEARCH_REQUEST,
    payload: { query },
  }
}

function receiveSearchResults (results) {
  return {
    type: SEARCH_RESPONSE,
    payload: { results },
  }
}

export function clearSearchResults () {
  return {
    type: SEARCH_CLEAR,
  }
}

export function fetchSearchResults (searchCallback, query) {
  return function searchResultsDispatcher (dispatch) {
    if (!query) {
      return dispatch(receiveSearchResults([]))
    }
    // First dispatch: inform state that request has been sent
    dispatch(startSearchRequest(query))

    searchCallback(query, results => {
      // FIXME: add error handling
      dispatch(receiveSearchResults(results))
    })
  }
}
