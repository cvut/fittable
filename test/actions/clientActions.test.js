import test from 'blue-tape'
import { spy } from 'sinon'
import { CLIENT_CHANGE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/clientActions'
import { SMALL_SCREEN, LARGE_SCREEN } from '../../src/constants/screenSizes'

test('detectScreenSize()', t => {
  const thunk = actions.detectScreenSize()

  const dispatch = spy()
  const getState = () => { return {client: {screenSize: SMALL_SCREEN}} }
  const getSecondState = () => { return {client: {screenSize: LARGE_SCREEN}} }

  // stubbing global window object
  global.window = {innerWidth: 1280}
  thunk(dispatch, getState)
  global.window = {innerWidth: 1290}
  thunk(dispatch, getSecondState)

  t.equal(dispatch.callCount, 1, 'dispatches only once if the current state is different')

  const expectedArg = {type: CLIENT_CHANGE, payload: {screenSize: LARGE_SCREEN}}
  const [actualArg] = dispatch.firstCall.args
  t.deepEqual(actualArg, expectedArg, 'dispatches CLIENT_CHANGE with smallScreen payload')

  t.end()
})
