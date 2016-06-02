import { combineReducers } from 'redux'
import { merge } from 'ramda'

import { routerStateReducer } from 'redux-router'

import { DISPLAY_FILTERS_CHANGE } from '../constants/actionTypes'

import data from './dataReducer'
import ui from './uiReducer'
import search from './searchReducer'
import semester from './semesterReducer'
import client from './clientReducer'
import user from './userReducer'
import settings from './settingsReducer'

const initialDisplayFilters = {
/*eslint-disable */
  laboratory: true,
  tutorial: true,
  lecture: true,
  exam: true,
  assessment: true,
  course_event: true,
  teacher_timetable_slot: true,
  other: true,
/*eslint-enable */
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
