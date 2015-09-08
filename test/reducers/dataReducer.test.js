import test from 'blue-tape'
import { EVENTS_LOAD_STARTED, EVENTS_LOAD_COMPLETED, EVENTS_LOAD_FAILED } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/dataReducer'

test('data reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expectedLinkNames = {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  }
  t.equal(actual.waiting, true, 'waiting is initially true')
  t.deepEqual(actual.events, [], 'events are empty')
  t.deepEqual(actual.linkNames, expectedLinkNames, 'initialises linkNames structure')
  t.deepEqual(actual.error, {type: null, visible: false}, 'initialises with null error')
  t.end()
})

test('data reducer EVENTS_LOAD_STARTED action', t => {
  const state = {waiting: false, linkNames: {}, events: []}

  const expected = {waiting: true, linkNames: {}, events: []}
  const actual = reducer(state, {type: EVENTS_LOAD_STARTED})
  t.deepEqual(actual, expected, 'sets waiting to true')
  t.end()
})

test('data reducer EVENTS_LOAD_COMPLETED action', t => {
  const state = {waiting: false, linkNames: {}, events: []}

  const events = [
    'some event',
    'other event',
  ]
  const linkNames = {
    cs: { teachers: {skocdop: 'Petr Skočdopole'}, exceptions: {}, courses: {} },
  }

  const expected = {
    waiting: false,
    events,
    linkNames,
  }
  const actual = reducer(state, {type: EVENTS_LOAD_COMPLETED, payload: {events, linkNames}})

  t.deepEqual(actual, expected, 'emits passed payload and sets waiting to false')
  t.end()
})
