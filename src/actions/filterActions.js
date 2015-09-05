import { DISPLAY_FILTERS_CHANGE } from '../constants/actionTypes'

export function changeDisplayFilters (payload) {
  return {
    type: DISPLAY_FILTERS_CHANGE,
    displayFilters: payload,
  }
}
