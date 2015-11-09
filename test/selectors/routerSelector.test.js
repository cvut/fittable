import test from 'blue-tape'
import * as sel from '../../src/selectors/routerSelector'
import timekeeper from 'timekeeper'
import routerState from '../helpers/routerState'

const STATE = routerState()

const FIXED_DATE = '2015-12-13'

test('calendarId()', t => {
  t.equal(sel.calendarId(STATE), 'MI-RUB', 'extracts calendarId from router')
  t.equal(sel.calendarId(undefined), 'me', 'returns a fallback calendarId for undefined router state')
  t.end()
})

test('calendarType()', t => {
  t.equal(sel.calendarType(STATE), 'courses', 'extracts calendarType from router')
  t.equal(sel.calendarType(undefined), 'people', 'returns a fallback calendarType for undefined router state')
  t.end()
})

test('viewDate()', t => {
  t.equal(sel.viewDate(STATE), '2015-10-12', 'extracts date from query parameter')
  const d = Date.parse(FIXED_DATE)
  timekeeper.freeze(d)
  t.equal(sel.viewDate(undefined), FIXED_DATE, 'returns a fallback value for undefined date query parameter')
  timekeeper.reset()
  t.end()
})

test('calendar()', t => {
  const expected = {
    id: 'MI-RUB',
    type: 'courses',
    date: '2015-10-12',
  }

  const actual = sel.calendar(STATE)

  t.deepEqual(actual, expected, 'returns all known params from route')
  t.end()
})
