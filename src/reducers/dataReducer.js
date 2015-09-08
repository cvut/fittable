import { EVENTS_LOAD_STARTED, EVENTS_LOAD_COMPLETED, EVENTS_LOAD_FAILED } from '../constants/actionTypes'

const initialState = {
  waiting: true,
  linkNames: {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  },
  events: [],
  error: {
    type: null,
    visible: false,
  },
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case EVENTS_LOAD_STARTED:
      return {
        ...state,
        waiting: true,
      }
    case EVENTS_LOAD_COMPLETED:
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
