import test from 'blue-tape'
import { spy } from 'sinon'
import * as s from '../src/semester'

test('currentSemester()', t => {
  const semesters = [
    {
      id: '18000-B142',
      faculty: 18000,
      startsAt: '2014-10-01',
      endsAt: '2015-02-15',
    },
    {
      id: '18000-B151',
      faculty: 18000,
      startsAt: '2015-02-16',
      endsAt: '2015-09-21',
    },
    {
      id: '13000-B151',
      faculty: 13000,
      startsAt: '2015-02-16',
      endsAt: '2015-09-21',
    },
  ]

  ;[// day         facultyId  expectedId
    ['2015-03-01', 18000,    '18000-B151'],
    ['2015-02-16', 13000,    '13000-B151'],
    ['2015-02-15', 18000,    '18000-B142'],
  ].forEach(([day, facultyId, expectedId]) => {
    const actual = s.findSemester(facultyId, semesters, day)

    t.equal(actual.id, expectedId, `day ${day} is within semester ${expectedId} with fc ${facultyId}`)
  })

  t.end()
})

test('semesterSeason()', t => {
  t.equal(s.semesterSeason('B142'), 'summer', 'semester ending with 2 is summer')
  t.equal(s.semesterSeason('B151'), 'winter', 'semester ending with 1 is winter')
  t.end()
})

test('semesterYears()', t => {
  t.deepEqual(s.semesterYears('B142'), [2014, 2015], '?14? is a semester in 2014/2015 academic year')
  t.deepEqual(s.semesterYears('B151'), [2015, 2016], '?15? is a semester in 2015/2016 academic year')
  t.end()
})

test('convertRawSemester()', t => {
  const original = {
    id: '18000-B142',
    semester: 'B142',
    faculty: 18000,
    startsAt: '2015-02-16',
    endsAt: '2015-09-21',
    examsStartsAt: '2015-05-18',
    examsEndsAt: '2015-06-27',
    firstWeekParity: 'odd',
    hourDuration: 45,
    breakDuration: 15,
    dayStartsAtHour: 7.5,
    dayEndsAtHour: 21.25,
    periods: [
      {
        type: 'exams',
        startsOn: '2015-05-18',
        endsOn: '2015-06-27',
      },
    ],
  }

  const expected = {
    id: original.id,
    startsOn: '2015-02-16',
    endsOn: '2015-09-21',
    season: 'summer',
    years: [2014, 2015],
    grid: {
      starts: 7.5,
      ends: 21.25,
      lessonDuration: 0.875,
    },
    periods: [
      {
        type: 'exams',
        startsOn: '2015-05-18',
        endsOn: '2015-06-27',
      },
    ],
    valid: true,
    firstWeekParity: 'odd',
  }

  const actual = s.convertRawSemester(original)
  t.deepEqual(actual, expected, 'converts given data to match the expected state')
  t.end()
})

test('dateInSemester()', t => {
  const semester = {
    startsOn: '2015-02-16',
    endsOn: '2015-09-21',
  }

  const dateIn = new Date('2015-03-01')
  const dateOut = new Date('2015-10-01')
  t.equal(s.dateInSemester(dateIn, semester), true, 'returns true for date within the semester')
  t.equal(s.dateInSemester(dateOut, semester), false, 'returns false for date outside of the semester')
  t.end()
})

test('semesterName()', t => {
  const dispatch = spy()

  // faux counterpart
  const translate = (key, options) => {
    dispatch(key, options)
    return 'translated-string'
  }

  const semester = {
    season: 'winter',
    valid: true,
    years: [2015, 2016],
  }
  s.semesterName(translate, semester)

  const semester2 = {
    season: 'summer',
    valid: true,
    years: [2016, 2017],
  }
  s.semesterName(translate, semester2)

  const invsemester = {
    season: 'summer',
    valid: false,
    years: [2016, 2017],
  }

  const emptysemester = { }

  t.deepEqual(dispatch.firstCall.args, ['winter_sem', {year: '2015/16'}], 'correctly recognize winter sem. 15/16')
  t.deepEqual(dispatch.lastCall.args, ['summer_sem', {year: '2016/17'}], 'correctly recognize summer sem. 16/17')

  t.equal(s.semesterName(translate, semester), 'translated-string', 'returns translated string from counterpart')
  t.equal(s.semesterName(translate, invsemester), null, 'returns null on invalid semesters')
  t.equal(s.semesterName(translate, emptysemester), null, 'returns null on semesters with missing data')

  t.end()
})

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
  const period = {type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'even'}

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
  const period = {type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'even'}
  const period2 = {type: 'teaching', startsOn: '2015-11-02', endsOn: '2015-12-01', firstWeekParity: 'odd'}

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

  ;[
    { viewDate: new Date('2015-12-14'), weekParity: 'odd', weekNum: 11, weekType: 'teaching' },
    { viewDate: new Date('2015-12-21'), weekParity: 'even', weekNum: 12, weekType: 'teaching' },
    { viewDate: new Date('2015-12-28'), weekParity: 'odd', weekNum: 13, weekType: 'holidays' },
  ].forEach(({viewDate, weekParity, weekNum, weekType}) => {
    const actual = s.weekProperties(viewDate, semester)
    const expected = {weekParity, weekNum, weekType}
    t.deepEqual(actual, expected, `test if week properties for ${viewDate} are correct`)
  })

  const outofrangeExpected = { weekParity: null, weekNum: null, weekType: null }
  t.deepEqual(s.weekProperties(new Date('2020-01-01'), semester),
              outofrangeExpected,
              'test week properties for viewDate out of range')

  t.end()
})
