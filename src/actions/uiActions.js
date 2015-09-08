import { SIDEBAR_DISPLAY, EVENT_DISPLAY, RESET_DISPLAY } from '../constants/actionTypes'

export function displaySidebar (sidebar) {
  return {
    type: SIDEBAR_DISPLAY,
    payload: { sidebar },
  }
}
