import { SEARCH_REQUEST, SEARCH_RESPONSE, SEARCH_CLEAR } from '../constants/actionTypes'

const initialState = {
  waiting: false,
  query: '',
  results: [],
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        waiting: true,
        query: action.payload.query,
        results: [],
      }
    case SEARCH_RESPONSE:
      return {
        ...state,
        waiting: false,
        results: action.payload.results,
      }
    case SEARCH_CLEAR:
      return {
        ...state,
        results: [],
      }
    default:
      return state
  }
}
