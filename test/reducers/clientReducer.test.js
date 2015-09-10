import test from 'blue-tape'
import { CLIENT_CHANGE } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/clientReducer'

test('client reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = {
    smallScreen: true,
  }
  t.deepEqual(actual, expected, 'small screen is considered by default')
  t.end()
})

test('client reducer CLIENT_CHANGE action', t => {
  const state = {
    smallScreen: true,
  }
  const expected = {
    smallScreen: false,
  }
  const actual = reducer(state, {type: CLIENT_CHANGE, payload: {smallScreen: false}})
  t.deepEqual(actual, expected, 'small screen is considered by default')
  t.end()
})

