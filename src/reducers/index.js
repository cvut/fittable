import { combineReducers } from 'redux'
import { merge } from 'ramda'

import { SETTINGS_CHANGE } from '../constants/actionTypes'
import { now } from '../date'

const initialSettings = {
  locale: 'cs',
  layout: 'horizontal',
  eventsColors: false,
  fullWeek: false,
  facultyGrid: false,
}

function viewDate (state = now()) {
  return state
}

function settings (state = initialSettings, action) {
  switch (action.type) {
    case SETTINGS_CHANGE:
      return merge(state, action.settings)
    default:
      return state
  }
}

const fittableApp = combineReducers({
  settings,
  viewDate,
})

export default fittableApp
