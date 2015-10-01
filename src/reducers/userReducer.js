import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  publicAccessToken: null,
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case USER_LOAD_STARTED:
      return {
        ...state,
        isFetching: true,
      }
    case USER_LOAD_COMPLETED:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      }
    default:
      return state
  }
}
