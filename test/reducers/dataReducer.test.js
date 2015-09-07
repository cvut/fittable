import test from 'blue-tape'
import { EVENTS_REQUEST, EVENTS_RESPONSE } from '../../src/constants/actionTypes'
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
  t.end()
})

test('data reducer with EVENTS_REQUEST action', t => {
  const state = {waiting: false, linkNames: {}, events: []}

  const expected = {waiting: true, linkNames: {}, events: []}
  const actual = reducer(state, {type: EVENTS_REQUEST})
  t.deepEqual(actual, expected, 'sets waiting to true')
  t.end()
})

test('data reducer with EVENTS_RESPONSE action', t => {
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
  const actual = reducer(state, {type: EVENTS_RESPONSE, payload: {events, linkNames}})

  t.deepEqual(actual, expected, 'emits passed payload and sets waiting to false')
  t.end()
})
