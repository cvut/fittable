import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../constants/actionTypes'
import { fetchUserCallback, logoutUserCallback } from '../callbacks'

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

export function logoutUser () {
  return function thunk () {
    logoutUserCallback(error => {
      if (error) {
        console.error(error)
        global.alert(error.message)
      } else {
        global.location.href = 'landing.html'
      }
    })
  }
}
