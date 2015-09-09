import { SEMESTER_LOAD_COMPLETED } from '../constants/actionTypes'

const initialState = {
  season: 'winter', // TODO: this should be calculated from current date
  grid: {
    // Fallback data for FIT
    starts: 7.5,
    ends: 21.5,
    lessonDuration: 0.875,
  },
  periods: [],
  /*
  startsOn,
  endsOn,
  periods
  */
}

export default function semester (state = initialState, action) {
  switch (action.type) {
    case SEMESTER_LOAD_COMPLETED:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
