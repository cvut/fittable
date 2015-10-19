import test from 'blue-tape'
import { CLIENT_CHANGE } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers/clientReducer'
import { SMALL_SCREEN, MEDIUM_SCREEN } from '../../src/constants/screenSizes'


test('client reducer initial state', t => {
  const actual = reducer(undefined, {type: null})
  const expected = {
    screenSize: SMALL_SCREEN,
  }
  t.deepEqual(actual, expected, 'small screen is considered by default')
  t.end()
})

test('client reducer CLIENT_CHANGE action', t => {
  const state = {
    screenSize: SMALL_SCREEN,
  }
  const expected = {
    screenSize: MEDIUM_SCREEN,
  }
  const actual = reducer(state, {type: CLIENT_CHANGE, payload: {screenSize: MEDIUM_SCREEN}})
  t.deepEqual(actual, expected, 'small screen is considered by default')
  t.end()
})

