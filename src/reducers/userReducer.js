import { USER_LOAD_STARTED, USER_LOAD_COMPLETED, USER_LOGGED_OUT } from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  publicAccessToken: null,
  id: null,
  name: null,
  invalid: false,
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
    case USER_LOGGED_OUT:
      return {
        ...state,
        invalid: true,
      }
    default:
      return state
  }
}
