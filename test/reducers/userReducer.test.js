import test from 'blue-tape'
import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/userReducer'

test('user reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = {
    isFetching: false,
    publicAccessToken: null,
    id: null,
    name: null,
    invalid: false,
  }

  t.deepEqual(actual, expected, 'is not fetching and has an empty token')
  t.end()
})

test('user reducer on USER_LOAD_STARTED action', t => {
  const state = {
    isFetching: false,
    publicAccessToken: null,
  }
  const expected = {
    isFetching: true,
    publicAccessToken: null,
  }
  const actual = reducer(state, {type: USER_LOAD_STARTED})

  t.deepEqual(actual, expected, 'changes isFetching to true')
  t.end()
})

test('user reducer on USER_LOAD_COMPLETED action', t => {
  const state = {
    isFetching: true,
    publicAccessToken: null,
    id: null,
    name: null,
  }
  const expected = {
    isFetching: false,
    publicAccessToken: 'asd123',
    id: 'loremi',
    name: 'Lorem Ipsum',
  }
  const payload = {
    publicAccessToken: 'asd123',
    id: 'loremi',
    name: 'Lorem Ipsum',
  }
  const actual = reducer(state, {type: USER_LOAD_COMPLETED, payload})

  t.deepEqual(actual, expected, 'changes isFetching to true')
  t.end()
})
