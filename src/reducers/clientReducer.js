import { CLIENT_CHANGE } from '../constants/actionTypes'

const initialState = {
  smallScreen: true,
}

export default function client (state = initialState, action) {
  switch (action.type) {
    case CLIENT_CHANGE:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
