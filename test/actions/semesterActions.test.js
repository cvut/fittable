import test from 'blue-tape'
import { spy } from 'sinon'
import { fmoment } from '../../src/date'
import { SEMESTER_LOAD_COMPLETED } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/semesterActions'

const getEmptyState = () => {
  return {semester: {}}
}

test('fetchSemesterData() dispatches SEMESTER_LOAD_COMPLETED with callback data', t => {
  const searchCallback = (cb) => {
    t.equal(typeof cb, 'function', 'callback receives a callback for response')
    t.end()
  }

  const thunk = actions.fetchSemesterData(searchCallback, new Date())
  const dispatch = () => {}

  t.equal(typeof thunk, 'function', 'fetchSearchResults returns a thunk function immediately')

  thunk(dispatch, getEmptyState)
})

test('fetchSemesterData() dispatch', t => {
  let date = new Date('2015-09-10')
  const semesters = [
    {
      id: '18000-B142',
      semester: 'B142',
      faculty: 18000,
      startsOn: fmoment('2015-02-16'),
      endsOn: fmoment('2015-09-21'),
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
      periods: [],
    },
    {
      id: '18000-B151',
      semester: 'B151',
      faculty: 18000,
      startsOn: fmoment('2015-09-12'),
      endsOn: fmoment('2016-02-28'),
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
      periods: [],
    },
  ]

  // faux callback passed from outside application
  const callback = (cb) => cb(semesters)
  const callbackEmpty = (cb) => cb({})

  let dispatch = spy()
  let expectedCalls = 1

  // fetch correct data
  let thunk = actions.fetchSemesterData(callback, date)
  thunk(dispatch, getEmptyState)
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  // fetch missing data
  thunk = actions.fetchSemesterData(callbackEmpty, date)
  thunk(dispatch, getEmptyState)
  t.equal(dispatch.callCount, ++expectedCalls, `dispatch has been called ${expectedCalls} times`)

  // fetch correct data with incorrect actual date
  date = new Date('1970-09-10')
  thunk = actions.fetchSemesterData(callback, date)
  thunk(dispatch, getEmptyState)
  t.equal(dispatch.callCount, ++expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchSemesterData() dispatched action', st => {
    const [actualArg,] = dispatch.firstCall.args
    st.equal(actualArg.type, SEMESTER_LOAD_COMPLETED, 'dispatches SEMESTER_LOAD_COMPLETED action')
    st.equal(actualArg.payload.id, '18000-B142', 'sends just the semester for a given date')
    st.equal(actualArg.payload.season, 'summer', 'calculates the semester season')
    st.equal(actualArg.payload.valid, true, 'is valid when the data are complete and current semester')
    st.equal(typeof actualArg.payload.grid, 'object', 'converts semester details for consumption by fittable')
    st.end()
  })

  t.test('fetchSemesterData() dispatched with missing data', st => {
    const [actualArg,] = dispatch.secondCall.args
    st.equal(actualArg.payload.valid, false, 'is invalid because of missing data')
    st.end()
  })

  t.test('fetchSemesterData() dispatched with out-of-semester date', st => {
    const [actualArg,] = dispatch.thirdCall.args
    st.equal(actualArg.payload.valid, false, 'is invalid because of wrong date')
    st.end()
  })
})

test('fetchSemesterData() dispatch with semester loaded', t => {
  const date = new Date('2015-09-10')
  const state = {
    semester: {
      startsOn: fmoment('2015-02-18'),
      endsOn: fmoment('2015-09-21'),
      valid: true,
    },
  }

  const dispatch = spy()
  const callback = spy()

  const thunk = actions.fetchSemesterData(callback, date)

  thunk(dispatch, () => state)
  t.equal(callback.callCount, 0, 'does not execute callback if the date is already within current semester')
  t.equal(dispatch.callCount, 0, 'does not dispatches action if the date is already within current semester')
  t.end()
})

test('invalidateSemesterData()', t => {
  const semester = {
    season: 'winter',
    valid: true,
    years: [2015, 2016],
  }

  const expected = {
    season: 'winter',
    valid: false,
    years: [2015, 2016],
  }

  const invalidated = actions.invalidateSemesterData(semester)

  t.deepEqual(invalidated, expected, 'invalidate semester')
  t.deepEqual(actions.invalidateSemesterData(invalidated), expected, 'invalidating invalidated semester does nothing')
  t.end()
})
