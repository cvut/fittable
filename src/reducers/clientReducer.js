import { CLIENT_CHANGE } from '../constants/actionTypes'
import { SMALL_SCREEN } from '../constants/screenSizes'

const initialState = {
  screenSize: SMALL_SCREEN,
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
