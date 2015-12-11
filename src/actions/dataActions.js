import { isoWeekRange, now } from '../date'
import { invertLinkNames } from '../dataManipulation'
import {
  EVENTS_LOAD_STARTED,
  EVENTS_LOAD_COMPLETED,
  EVENTS_LOAD_FAILED,
  DATA_ERROR_HIDE,
  DATA_UPDATE_NOW,
} from '../constants/actionTypes'

function startEventsRequest () {
  return {
    type: EVENTS_LOAD_STARTED,
  }
}

function receiveEvents (events, linkNames) {
  return {
    type: EVENTS_LOAD_COMPLETED,
    payload: {
      events,
      linkNames,
    },
  }
}

function receiveError (errorObject) {
  return {
    type: EVENTS_LOAD_FAILED,
    payload: errorObject,
  }
}

export function fetchEvents (dataCallback, calendar) {
  const {id: calendarId, type: calendarType, date} = calendar
  const [dateFrom, dateTo] = isoWeekRange(date)

  return function (dispatch) {
    // First dispatch: inform state that loading is going on
    dispatch(startEventsRequest())

    dataCallback({calendarId, calendarType, dateFrom, dateTo}, function (error, result) {
      if (error) {
        return dispatch(receiveError(error))
      }
      const { events, linkNames } = result
      // We have (hopefully) received data by now
      // FIXME: add error handling
      dispatch(receiveEvents(events, invertLinkNames(linkNames)))
    })
  }
}

export function hideDataError () {
  return {
    type: DATA_ERROR_HIDE,
    payload: {},
  }
}

export function updateNow () {
  return {
    type: DATA_UPDATE_NOW,
    payload: now(),
  }
}
