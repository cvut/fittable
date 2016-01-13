/*eslint camelcase: 0 */
import test from 'blue-tape'
import * as s from '../src/semesterPeriods'

test('periodFromDate()', t => {
  const periods = [
    {type: 'teaching', starts_at: '2015-01-01', ends_at: '2015-02-01', first_week_parity: 'even'},
    {type: 'exam',     starts_at: '2015-03-01', ends_at: '2015-04-01', first_week_parity: 'even'},
    {type: 'teaching', starts_at: '2015-04-01', ends_at: '2015-06-01', first_week_parity: 'even'},
    {type: 'teaching', starts_at: '2015-06-01', ends_at: '2017-01-01', first_week_parity: 'even'},
  ]

  ;[// date        expected
    ['2015-01-01', periods[0]],
    ['2015-01-15', periods[0]],
    ['2015-03-15', periods[1]],
    ['2016-01-01', periods[3]],
    ['1970-05-15', undefined ],
    ['2015-02-15', undefined ],
    ['2020-05-15', undefined ],
  ].forEach(([date, expected]) => {
    const message = `${date} matches ${expected === undefined ? 'no' : 'correct'} period`

    t.deepEqual(s.periodFromDate(new Date(date), periods), expected, message)
  })

  t.end()
})

test('semesterWeek()', t => {
  const period = {
    type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'even',
  }

  ;[// date       expected  message
    ['2015-11-02', 1,      'returns first week on the same date'],
    ['2015-11-08', 1,      'returns first week on date +6 days' ],
    ['2015-11-09', 2,      'returns second week on date +7 days'],
    ['2015-11-16', 3,      'returns third week on date +14 days'],
    ['2014-01-08', null,   'returns null on past date'          ],
  ].forEach(([date, expected, message]) => {
    t.equal(s.semesterWeek(new Date(date), period), expected, message)
  })

  t.end()
})

test('periodWeekParity()', t => {
  const period = {
    type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'even',
  }
  const period2 = {
    type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'odd',
  }

  ;[// date        period   expected  message
    ['2015-11-02', period,  'even',   'returns first week on the same date (first week is even)'],
    ['2015-11-08', period,  'even',   'returns first week on date +6 days (first week is even)' ],
    ['2015-11-09', period,  'odd',    'returns second week on date +7 days (first week is even)'],
    ['2015-11-16', period,  'even',   'returns third week on date +14 days (first week is even)'],
    ['2015-11-02', period2, 'odd',    'returns first week on the same date (first week is odd)'],
    ['2015-11-08', period2, 'odd',    'returns first week on date +6 days (first week is odd)' ],
    ['2015-11-09', period2, 'even',   'returns second week on date +7 days (first week is odd)'],
    ['2015-11-16', period2, 'odd',    'returns third week on date +14 days (first week is odd)'],
  ].forEach(([date, period, expected, message]) => {
    t.equal(s.periodWeekParity(new Date(date), period), expected, message)
  })

  t.end()
})

test('weekProperties()', t => {
  const semester = {
    startsOn: '2015-10-01',
    endsOn: '2016-02-22',
    periods: [
      {ends_at: '2015-12-22', first_week_parity: 'even', starts_at: '2015-10-01', type: 'teaching'},
      {ends_at: '2015-12-31', first_week_parity: 'even', starts_at: '2015-12-23', type: 'holidays'},
    ],
  }

  ;[//viewDate,    weekParity, weekNum, weekType
    ['2015-12-14', 'odd',      11,      'teaching'],
    ['2015-12-21', 'even',     12,      'teaching'],
    ['2015-12-28', 'odd',      13,      'holidays'],
  ].forEach(([viewDate, weekParity, weekNum, weekType]) => {
    const expected = { weekParity, weekNum, weekType }
    const actual = s.weekProperties(new Date(viewDate), semester)

    t.deepEqual(actual, expected, `test if week properties for ${viewDate} are correct`)
  })

  const expected = { weekParity: null, weekNum: null, weekType: null }
  t.deepEqual(s.weekProperties(new Date('2020-01-01'), semester),
              expected,
              'test week properties for viewDate out of range')

  t.end()
})

test('periodsByWeek()', t => {
  const periods = [
    { // 0
      type: 'holiday',
      starts_at: '2015-12-28',
      ends_at: '2016-01-04',
    },
    { // 1
      type: 'teaching',
      starts_at: '2016-01-05',
      ends_at: '2016-01-06',
      first_week_parity: 'even',
    },
    { // 2
      type: 'teaching',
      starts_at: '2016-01-07',
      ends_at: '2016-01-07',
      first_week_parity: 'odd',
    },
    { // 3
      type: 'teaching',
      starts_at: '2016-01-08',
      ends_at: '2016-01-12',
      first_week_parity: 'even',
    },
    { // 4
      type: 'exam',
      starts_at: '2016-01-13',
      ends_at: '2016-01-18',
      first_week_parity: 'odd',
    },
  ]

  const expected = {
    1: {
      type: 'holiday',
      parity: 'odd',
      periods: [ periods[0] ],
    },
    2: {
      type: 'teaching',
      parity: 'even',
      // weekOrder: 1,
      periods: [ periods[0], periods[1] ],
    },
    3: {
      type: 'teaching',
      parity: 'odd',
      // weekOrder: 2,
      periods: [ periods[1], periods[2], periods[3] ],
    },
    4: {
      type: 'exam',
      parity: 'even',
      periods: [ periods[4] ],
    },
  }

  const actual = s.periodsByWeek(periods)

  t.deepEqual(actual, expected, 'converts periods to a map of week to ')

  t.end()
})
