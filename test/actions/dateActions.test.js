import test from 'blue-tape'
import { VIEW_DATE_CHANGE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/dateActions'

function expectedVal (payload) {
  return {type: VIEW_DATE_CHANGE, viewDate: payload}
}

test('changeViewDate', (t) => {
  const payload = Date.now()
  const result = actions.changeViewDate(payload)
  t.equal(result.type, VIEW_DATE_CHANGE, 'matches the action type')
  t.equal(result.viewDate, payload, 'matches the date')
  t.end()
})
