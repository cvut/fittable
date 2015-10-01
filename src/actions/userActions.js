import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../constants/actionTypes'

import { user as userCallback } from '../callbacks'

function startUserRequest () {
  return {
    type: USER_LOAD_STARTED,
  }
}

function receiveUser (publicAccessToken) {
  return {
    type: USER_LOAD_COMPLETED,
    payload: {
      publicAccessToken,
    },
  }
}

export function fetchUserData (dataCallback, weekDate) {
  return function thunk (dispatch) {
    dispatch(startUserRequest())

    userCallback((error, result) => {
      if (error) {
        return dispatch(receiveUser(null))
      }
      const { accessToken } = result
      dispatch(receiveUser(accessToken))
    })
  }
}
