import { SIDEBAR_DISPLAY, EVENT_DISPLAY, RESET_DISPLAY, HIDE_ERROR } from '../constants/actionTypes'

export function displaySidebar (sidebar) {
  return {
    type: SIDEBAR_DISPLAY,
    payload: { sidebar },
  }
}

export function displayEvent (eventId) {
  return {
    type: EVENT_DISPLAY,
    payload: { eventId },
  }
}

export function hideError () {
  return {
    type: HIDE_ERROR,
    payload: {},
  }
}
