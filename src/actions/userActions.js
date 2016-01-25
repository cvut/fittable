import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../constants/actionTypes'
import { fetchUserCallback } from '../callbacks'

function startUserRequest () {
  return {
    type: USER_LOAD_STARTED,
  }
}

function receiveUser (payload) {
  return {
    type: USER_LOAD_COMPLETED,
    payload,
  }
}

export function fetchUserData () {
  return function thunk (dispatch) {
    dispatch(startUserRequest())

    fetchUserCallback((error, result) => {
      if (error) {
        return dispatch(receiveUser(null))
      }
      dispatch(receiveUser(result))
    })
  }
}
