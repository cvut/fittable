import test from 'blue-tape'
import { spy } from 'sinon'
import { CLIENT_CHANGE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/clientActions'

test('detectScreenSize()', t => {
  const thunk = actions.detectScreenSize()

  const dispatch = spy()
  const getState = () => { return {client: {smallScreen: true}} }

  // stubbing global window object
  global.window = {innerWidth: 800}
  thunk(dispatch, getState)
  global.window = {innerWidth: 500}
  thunk(dispatch, getState)

  t.equal(dispatch.callCount, 1, 'dispatches only once if the current state is different')

  const expectedArg = {type: CLIENT_CHANGE, payload: {smallScreen: false}}
  const [actualArg,] = dispatch.firstCall.args
  t.deepEqual(actualArg, expectedArg, 'dispatches CLIENT_CHANGE with smallScreen payload')

  t.end()
})
