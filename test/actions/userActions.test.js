import test from 'blue-tape'
import { spy } from 'sinon'
import { USER_LOAD_STARTED, USER_LOAD_COMPLETED } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/userActions'

const getEmptyState = () => {
  return {user: {}}
}

test('fetchUserData() dispatches USER_LOAD_STARTED', t => {
  const thunk = actions.fetchUserData()
  const dispatch = spy()

  t.equal(typeof thunk, 'function', 'fetchUserData returns a thunk function immediately')

  thunk(dispatch, getEmptyState)

  const expectedCalls = 2
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchUserData() first dispatch', st => {
    const expectedArg = {type: USER_LOAD_STARTED}
    const [actualArg,] = dispatch.firstCall.args
    st.deepEqual(actualArg, expectedArg, 'dispatches an USER_LOAD_STARTED')
    st.end()
  })

  t.test('fetchEvents() second dispatch', st => {
    const [actualArg,] = dispatch.secondCall.args

    st.equal(actualArg.type, USER_LOAD_COMPLETED, 'dispatches USER_LOAD_COMPLETED')
    st.equal(typeof actualArg.payload.publicAccessToken, 'string', 'dispatches payload with publicAccessToken')
    st.equal(typeof actualArg.payload.id, 'string', 'dispatches payload with user id')
    st.equal(typeof actualArg.payload.name, 'string', 'dispatches payload with user name')
    st.end()
  })
})
