import test from 'blue-tape'
import { SEARCH_REQUEST, SEARCH_RESPONSE } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/searchReducer'

test('search reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = {
    waiting: false,
    query: '',
    results: [],
  }
  t.deepEqual(actual, expected, 'initialises empty structure with no results, query and not waiting')
  t.end()
})

test('search reducer SEARCH_REQUEST action', t => {
  const state = {waiting: false, query: 'meh', results: ['lorem', 'ipsum']}
  const expected = {waiting: true, query: 'my query', results: []}
  const actual = reducer(state, {type: SEARCH_REQUEST, payload: {query: 'my query'}})
  t.deepEqual(actual, expected, 'sets waiting to true, propagates the query and empties results')
  t.end()
})

test('search reducer SEARCH_RESPONSE action', t => {
  const state = {waiting: true, query: 'query', results: []}

  const results = [
    'resultA',
    'resultB',
  ]

  const expected = {
    waiting: false,
    query: 'query',
    results,
  }
  const actual = reducer(state, {type: SEARCH_RESPONSE, payload: {results}})

  t.deepEqual(actual, expected, 'emits passed results, keeps query and sets waiting to false')
  t.end()
})
