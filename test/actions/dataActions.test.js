import test from 'blue-tape'
import { spy } from 'sinon'
import { EVENTS_REQUEST, EVENTS_RESPONSE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/dataActions'

test('fetchEvents() executes a given callback with a week range', t => {
  const expectedFrom = '2015-09-07'
  const expectedTo = '2015-09-13'
  const today = new Date('2015-09-09')

  const dataCallback = (actualFrom, actualTo, cb) => {
    t.equal(actualFrom, expectedFrom, 'callback receives dateFrom string for a week start')
    t.equal(actualTo, expectedTo, 'callback receives dateTo string for a week end')
    t.equal(typeof cb, 'function', 'callback receives a callback for response')
    t.end()
  }

  const thunk = actions.fetchEvents(dataCallback, today)
  const dispatch = () => {}

  t.equal(typeof thunk, 'function', 'fetchEvents returns a thunk function immediately')

  thunk(dispatch)
})

test('fetchEvents() dispatch', t => {
  const today = new Date('2015-09-09')
  const dispatch = spy()

  const responseData = [
    ['event', 'event'],
    {
      teachers: [
        {
          id: 'vomackar',
          name: {
            cs: 'Karel Vomáčka',
            en: 'Carl Vomacka',
          },
        },
      ],
    },
  ]

  const callback = (from, to, cb) => cb(...responseData)
  const thunk = actions.fetchEvents(callback, today)
  thunk(dispatch)

  const expectedCalls = 2
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchEvents() first dispatch', st => {
    const expectedArg = {type: EVENTS_REQUEST}
    const [actualArg,] = dispatch.firstCall.args
    st.deepEqual(actualArg, expectedArg, 'dispatches an EVENTS_REQUEST')
    st.end()
  })

  t.test('fetchEvents() second dispatch', st => {
    const expectedLinkNames = {
      cs: {
        teachers: {
          vomackar: 'Karel Vomáčka',
        },
        courses: {},
        exceptions: {},
      },
      en: {
        teachers: {
          vomackar: 'Carl Vomacka',
        },
        courses: {},
        exceptions: {},
      },
    }
    const [events,] = responseData
    const expectedArg = {type: EVENTS_RESPONSE, payload: {events, linkNames: expectedLinkNames}}
    const [actualArg,] = dispatch.secondCall.args
    st.deepEqual(actualArg, expectedArg, 'dispatches an EVENTS_RESPONSE')
    st.end()
  })
})
