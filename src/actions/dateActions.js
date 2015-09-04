import { VIEW_DATE_CHANGE } from '../constants/actionTypes'

export function changeViewDate (payload) {
  return {
    type: VIEW_DATE_CHANGE,
    viewDate: payload,
  }
}
