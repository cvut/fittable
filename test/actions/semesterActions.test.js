import test from 'blue-tape'
import { spy } from 'sinon'
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
      startsAt: '2015-02-16',
      endsAt: '2015-09-21',
      examsStartsAt: '2015-05-18',
      examsEndsAt: '2015-06-27',
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
    },
    {
      id: '18000-B151',
      semester: 'B151',
      faculty: 18000,
      startsAt: '2015-09-12',
      endsAt: '2016-02-28',
      examsStartsAt: '2015-01-12',
      examsEndsAt: '2015-02-20',
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
    },
  ]

  // faux callback passed from outside application
  const callback = (cb) => cb(semesters)

  let dispatch = spy()
  let thunk = actions.fetchSemesterData(callback, date)
  thunk(dispatch, getEmptyState)

  const expectedCalls = 1
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchSemesterData() dispatched action', st => {
    const [actualArg,] = dispatch.firstCall.args
    st.equal(actualArg.type, SEMESTER_LOAD_COMPLETED, 'dispatches SEMESTER_LOAD_COMPLETED action')
    st.equal(actualArg.payload.id, '18000-B142', 'sends just the semester for a given date')
    st.equal(actualArg.payload.season, 'summer', 'calculates the semester season')
    st.equal(typeof actualArg.payload.grid, 'object', 'converts semester details for consumption by fittable')
    st.end()
  })
})

test('fetchSemesterData() dispatch with semester loaded', t => {
  const date = new Date('2015-09-10')
  const state = {
    semester: {
      startsOn: '2015-02-18',
      endsOn: '2015-09-21',
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
