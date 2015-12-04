import test from 'blue-tape'
import * as actions from '../../src/actions/linkActions'

const CALENDAR = {type: 'course', id: 'MI-RUB', date: '2015-10-11'}

test('calendarUrl()', t => {
  t.test('calendarUrl() with all parameters', st => {
    st.plan(1)
    const expected = 'courses/MI-RUB?date=2015-10-11'
    const actual = actions.calendarUrl(CALENDAR)

    st.equal(actual, expected, 'generates URL for singular entity type')
  })

  t.test('calendarUrl() without date', st => {
    st.plan(1)
    const calendar = {
      type: 'person',
      id: 'vomackar',
      date: null,
    }
    const expected = 'people/vomackar'
    const actual = actions.calendarUrl(calendar)

    st.equal(actual, expected, 'generates URL without a date')
  })

  t.test('calendarUrl() for people/me', st => {
    st.plan(1)
    const expected = ''
    const calendar = {
      type: 'person',
      id: 'me',
      date: null,
    }
    const actual = actions.calendarUrl(calendar)

    st.equal(actual, expected, 'generates empty URL')
  })

  t.end()
})

test('changeCalendar()', t => {
  const actual = actions.changeCalendar(CALENDAR)
  const expectedPayload = {
    args: [null, 'courses/MI-RUB?date=2015-10-11'],
    method: 'pushState',
  }
  t.deepEqual(actual.payload, expectedPayload)
  t.end()
})
