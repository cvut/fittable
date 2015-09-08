import test from 'blue-tape'
import { SIDEBAR_DISPLAY, EVENT_DISPLAY, RESET_DISPLAY } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/uiActions'

test('displaySidebar()', t => {
  const expected = {type: SIDEBAR_DISPLAY, payload: {sidebar: 'search'}}
  const actual = actions.displaySidebar('search')
  t.deepEqual(actual, expected)
  t.end()
})
