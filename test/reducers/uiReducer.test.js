import test from 'blue-tape'
import { SIDEBAR_DISPLAY, EVENT_DISPLAY } from '../../src/constants/actionTypes'
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

test('ui reducer SIDEBAR_DISPLAY action', t => {
  const expected = {sidebar: 'search', eventId: null}
  const actual = reducer(undefined, {type: SIDEBAR_DISPLAY, payload: {sidebar: 'search'}})
  t.deepEqual(actual, expected, 'sets sidebar to a given state')
  t.end()

  t.test('ui reducer SIDEBAR_DISPLAY action with the same sidebar already opened', st => {
    const expected = null
    const actual = reducer({sidebar: 'search', eventId: null},
                           {type: SIDEBAR_DISPLAY, payload: {sidebar: 'search'}})

    st.deepEqual(actual.sidebar, expected, 'resets sidebar to null')
    st.end()
  })
})

test('UI reducer EVENT_DISPLAY action', t => {
  const expected = {sidebar: 'search', eventId: 42}
  const actual = reducer({sidebar: 'search', eventId: null},
                         {type: EVENT_DISPLAY, payload: {eventId: 42}})
  t.deepEqual(actual, expected, 'sets event to a given ID')
  t.end()
})
