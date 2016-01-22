import { SIDEBAR_DISPLAY, EVENT_DISPLAY } from '../constants/actionTypes'

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
