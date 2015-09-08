import { SEARCH_REQUEST, SEARCH_RESPONSE } from '../constants/actionTypes'

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

export function fetchSearchResults (searchCallback, query) {
  return function searchResultsDispatcher (dispatch) {
    // TODO: in case the query is empty, reset search state

    // First dispatch: inform state that request has been sent
    dispatch(startSearchRequest(query))

    searchCallback(query, results => {
      // FIXME: add error handling
      dispatch(receiveSearchResults(results))
    })
  }
}
