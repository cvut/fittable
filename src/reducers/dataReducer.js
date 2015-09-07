import { EVENTS_REQUEST, EVENTS_RESPONSE } from '../constants/actionTypes'

const initialState = {
  waiting: true,
  linkNames: {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  },
  events: [],
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case EVENTS_REQUEST:
      return {
        ...state,
        waiting: true,
      }
    case EVENTS_RESPONSE:
      const { events, linkNames } = action.payload
      return {
        waiting: false,
        events,
        linkNames,
      }
    default:
      return state
  }
}
