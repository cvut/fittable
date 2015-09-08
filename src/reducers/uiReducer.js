import { SIDEBAR_DISPLAY, EVENT_DISPLAY } from '../constants/actionTypes'

const initialState = {
  sidebar: null,
  eventId: null,
}

export default function ui (state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_DISPLAY:
      return {
        ...state,
        sidebar: action.payload.sidebar,
      }
    default:
      return state
  }
}
