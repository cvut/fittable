import { SETTINGS_CHANGE } from '../constants/actionTypes'
import { merge } from 'ramda'

export const initialState = {
  locale: 'cs',
  layout: 'vertical',
  eventsColors: false,
  fullWeek: false,
  facultyGrid: false,
}

export default function settings (state = initialState, action) {
  switch (action.type) {
    case SETTINGS_CHANGE:
      return merge(state, action.settings)
    default:
      return state
  }
}
