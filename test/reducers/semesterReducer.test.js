import test from 'blue-tape'
import { SEMESTER_LOAD_COMPLETED } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/semesterReducer'

const INITIAL_STATE = {
  season: 'winter',
  grid: {
    // Fallback data for FIT
    starts: 7.5,
    ends: 21.5,
    lessonDuration: 0.875,
  },
  periods: [],
  valid: false,
}

test('semester reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = INITIAL_STATE

  t.deepEqual(actual, expected, 'fallbacks to [winter] and FIT grid')
  t.end()
})

test('semester reducer SEMESTER_LOAD_COMPLETED action', t => {
  const state = {
    ...INITIAL_STATE,
  }

  const payload = {
    season: 'summer',
    grid: {
      starts: 7.0,
      ends: 21.0,
      lessonDuration: 0.75,
    },
  }
  const expected = {
    ...state,
    ...payload,
  }
  const actual = reducer(state, {type: SEMESTER_LOAD_COMPLETED, payload})

  t.deepEqual(actual, expected, 'emits passed payload')
  t.end()
})
