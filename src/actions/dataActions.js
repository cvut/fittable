import { EVENTS_REQUEST, EVENTS_RESPONSE } from '../constants/actionTypes'
import { isoWeekRange } from '../date'
import { invertLinkNames } from '../dataManipulation'

function startEventsRequest () {
  return {
    type: EVENTS_REQUEST,
  }
}

function receiveEvents (events, linkNames) {
  return {
    type: EVENTS_RESPONSE,
    payload: {
      events,
      linkNames,
    },
  }
}

export function fetchEvents (dataCallback, weekDate) {
  const [dateFrom, dateTo] = isoWeekRange(weekDate)

  return function (dispatch) {
    // First dispatch: inform state that loading is going on
    dispatch(startEventsRequest())

    dataCallback(dateFrom, dateTo, function (events, linkNames) {
      // We have (hopefully) received data by now
      // FIXME: add error handling
      dispatch(receiveEvents(events, invertLinkNames(linkNames)))
    })
  }
}
