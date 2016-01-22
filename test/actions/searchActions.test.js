import test from 'blue-tape'
import { spy } from 'sinon'
import { SEARCH_REQUEST, SEARCH_RESPONSE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/searchActions'

test('fetchSearchResults() executes a given callback with query', t => {
  const query = 'my search query'

  const searchCallback = (actualQuery, cb) => {
    t.equal(actualQuery, query, 'callback receives a passed query')
    t.equal(typeof cb, 'function', 'callback receives a callback for response')
    t.end()
  }

  const thunk = actions.fetchSearchResults(searchCallback, query)
  const dispatch = () => {}

  t.equal(typeof thunk, 'function', 'fetchSearchResults returns a thunk function immediately')

  thunk(dispatch)
})

test('fetchSearchResults() dispatch', t => {
  const query = 'search query'
  const results = ['resultA', 'resultB']
  // faux callback passed from outside application
  const callback = (query, cb) => cb(results)

  let dispatch = spy()
  let thunk = actions.fetchSearchResults(callback, query)
  thunk(dispatch)

  const expectedCalls = 2
  t.equal(dispatch.callCount, expectedCalls, `dispatch has been called ${expectedCalls} times`)

  t.test('fetchSearchResults() first dispatch', st => {
    const expectedArg = {type: SEARCH_REQUEST, payload: {query}}
    const [actualArg] = dispatch.firstCall.args

    st.deepEqual(actualArg, expectedArg, 'dispatches a SEARCH_REQUEST with query')
    st.end()
  })

  t.test('fetchSearchResults() second dispatch', st => {
    const expectedArg = {type: SEARCH_RESPONSE, payload: {results}}
    const [actualArg] = dispatch.secondCall.args

    st.deepEqual(actualArg, expectedArg, 'dispatches an SEARCH_RESPONSE with results')
    st.end()
  })

  t.test('fetchSearchResults() with empty query', st => {
    dispatch = spy()
    thunk = actions.fetchSearchResults(callback, '')
    thunk(dispatch)
    st.equal(dispatch.callCount, 1, 'dispatch is called only once')

    const expectedArg = {type: SEARCH_RESPONSE, payload: {results: []}}
    const [actualArg] = dispatch.firstCall.args

    st.deepEqual(actualArg, expectedArg, 'returns SEARCH_RESPONSE with empty results')
    st.end()
  })
})
