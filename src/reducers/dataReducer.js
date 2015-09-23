import { EVENTS_LOAD_STARTED, EVENTS_LOAD_COMPLETED, EVENTS_LOAD_FAILED } from '../constants/actionTypes'

const initialState = {
  waiting: true,
  linkNames: {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  },
  events: [],
  error: {
    visible: false,
    type: null,
    message: null,
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
        ...state,
        waiting: false,
        events,
        linkNames,
        error: {
          visible: false,
          type,
        },
      }
    case EVENTS_LOAD_FAILED:
      const type = action.payload.type
      return {
        ...state,
        waiting: false,
        error: {
          visible: true,
          type,
          message: action.payload.toString(),
        },
      }
    default:
      return state
  }
}
