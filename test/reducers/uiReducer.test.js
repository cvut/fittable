import test from 'blue-tape'
import { SIDEBAR_DISPLAY, EVENT_DISPLAY, RESET_DISPLAY } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/uiReducer'

test('UI reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = {
    sidebar: null,
    eventId: null,
  }
  t.deepEqual(actual, expected, 'no sidebar or event detail is open')
  t.end()
})

test('ui reducer with SIDEBAR_DISPLAY action', t => {
  const expected = {sidebar: 'search', eventId: null}
  const actual = reducer(undefined, {type: SIDEBAR_DISPLAY, payload: {sidebar: 'search'}})
  t.deepEqual(actual, expected, 'sets sidebar to a given state')
  t.end()
})

