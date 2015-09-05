import test from 'blue-tape'
import { DISPLAY_FILTERS_CHANGE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/filterActions'

test('changeDisplayFilters()', t => {
  const payload = { laboratory: false, assessment: true }
  const result = actions.changeDisplayFilters(payload)

  t.equal(result.type, DISPLAY_FILTERS_CHANGE, 'matches the action type')
  t.deepEqual(result.displayFilters, payload, 'matches the given filters')
  t.end()
})
