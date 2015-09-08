import test from 'blue-tape'
import { spy } from 'sinon'
import { SEMESTER_LOAD_COMPLETED } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/semesterActions'

test('fetchSemesterData() dispatches SEMESTER_LOAD_COMPLETED with callback data', t => {
  const searchCallback = (cb) => {
    t.equal(typeof cb, 'function', 'callback receives a callback for response')
    t.end()
  }

  const thunk = actions.fetchSemesterData(searchCallback, new Date())
  const dispatch = () => {}

  t.equal(typeof thunk, 'function', 'fetchSearchResults returns a thunk function immediately')

  thunk(dispatch)
})

test('fetchSemesterData() dispatch', t => {
  let date = new Date('2015-09-10')
  const semesters = [
    {
      id: '18000-B142',
      startsAt: '2014-10-01',
      endsAt: '2015-02-15',
    },
    {
      id: '18000-B151',
      startsAt: '2015-02-16',
      endsAt: '2015-09-21',
    },
  ]

  // faux callback passed from outside application
  const callback = (cb) => cb(semesters)

  let dispatch = spy()
  let thunk = actions.fetchSemesterData(callback, date)
  thunk(dispatch)

  const expectedCalls = 1
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchSemesterData() dispatched action', st => {
    const [actualArg,] = dispatch.firstCall.args
    st.equal(actualArg.type, SEMESTER_LOAD_COMPLETED, 'dispatches SEMESTER_LOAD_COMPLETED action')
    st.equal(actualArg.payload.semester.id, '18000-B151', 'sends just the semester for a given date')
    st.end()
  })
})
