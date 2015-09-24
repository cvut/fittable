import { EVENTS_LOAD_STARTED, EVENTS_LOAD_COMPLETED, EVENTS_LOAD_FAILED, HIDE_ERROR } from '../constants/actionTypes'

const initialState = {
  waiting: true,
  linkNames: {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  },
  events: [],
  errorVisible: false,
  error: {
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
        errorVisible: false,
      }
    case EVENTS_LOAD_FAILED:
      const type = action.payload.type
      return {
        ...state,
        waiting: false,
        errorVisible: true,
        error: {
          type,
          message: action.payload.toString(),
        },
      }
    case HIDE_ERROR:
      return {
        ...state,
        errorVisible: false,
      }
    default:
      return state
  }
}
