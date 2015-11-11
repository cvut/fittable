import test from 'blue-tape'
import * as actions from '../../src/actions/linkActions'

test('calendarUrl()', t => {
  t.test('calendarUrl() with all parameters', st => {
    st.plan(1)
    const expected = 'courses/MI-RUB?date=2015-10-11'
    const actual = actions.calendarUrl('course', 'MI-RUB', '2015-10-11')

    st.equal(actual, expected, 'generates URL for singular entity type')
  })

  t.test('calendarUrl() without date', st => {
    st.plan(1)
    const expected = 'people/vomackar'
    const actual = actions.calendarUrl('person', 'vomackar')

    st.equal(actual, expected, 'generates URL without a date')
  })

  t.end()
})

test('changeCalendar()', t => {
  const actual = actions.changeCalendar('person', 'MI-RUB')
  const expectedPayload = {
    args: [null, 'people/MI-RUB'],
    method: 'pushState',
  }
  t.deepEqual(actual.payload, expectedPayload)
  t.end()
})
