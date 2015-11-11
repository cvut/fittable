import { combineReducers } from 'redux'
import { merge } from 'ramda'

import { routerStateReducer } from 'redux-router'

import { SETTINGS_CHANGE, DISPLAY_FILTERS_CHANGE } from '../constants/actionTypes'

import data from './dataReducer'
import ui from './uiReducer'
import search from './searchReducer'
import semester from './semesterReducer'
import client from './clientReducer'
import user from './userReducer'

const initialSettings = {
  locale: 'cs',
  layout: 'horizontal',
  eventsColors: false,
  fullWeek: false,
  facultyGrid: false,
}

const initialDisplayFilters = {
/*eslint-disable */
  laboratory: true,
  tutorial: true,
  lecture: true,
  exam: true,
  assessment: true,
  course_event: true,
  other: true,
/*eslint-enable */
}

function settings (state = initialSettings, action) {
  switch (action.type) {
    case SETTINGS_CHANGE:
      return merge(state, action.settings)
    default:
      return state
  }
}

function displayFilters (state = initialDisplayFilters, action) {
  switch (action.type) {
    case DISPLAY_FILTERS_CHANGE:
      return merge(state, action.displayFilters)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  router: routerStateReducer,
  settings,
  displayFilters,
  data,
  ui,
  search,
  semester,
  client,
  user,
})

export default rootReducer
