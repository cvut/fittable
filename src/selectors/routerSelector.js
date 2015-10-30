import { pipe, path, prop, propOr } from 'ramda'

import { DEFAULT_CALENDAR_ID, DEFAULT_CALENDAR_TYPE } from '../constants'
import { now, isoDate } from '../date'

const currentDate = () => isoDate(now())

const routerParams = path(['router', 'params'])
const querySelector = path(['router', 'location', 'query'])

export const calendarId = pipe(routerParams, propOr(DEFAULT_CALENDAR_ID, 'calendarId'))
export const calendarType = pipe(routerParams, propOr(DEFAULT_CALENDAR_TYPE, 'calendarType'))

// Requires currentDate() to be reinvoked
export const viewDate = (state) => (
  prop('date', querySelector(state) || {}) || currentDate()
)

export const calendar = (state) => ({
  id: calendarId(state),
  type: calendarType(state),
  date: viewDate(state),
})
