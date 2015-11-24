import test from 'blue-tape'
import { spy } from 'sinon'
import * as s from '../src/semester'

test('currentSemester()', t => {
  const semesters = [
    {
      id: '18000-B142',
      startsAt: '2014-10-01',
      endsAt: '2015-02-15',
    },
    {
      id: '18000-B151',
      startsAt: '2015-02-16',
      endsAt: '2015-09-21',
    },
  ]

  const examples = [
    ['2015-03-01', '18000-B151'],
    ['2015-02-16', '18000-B151'],
    ['2015-02-15', '18000-B142'],
  ]

  examples.forEach(([day, expectedId]) => {
    const actual = s.findSemester(semesters, day)

    t.equal(actual.id, expectedId, `day ${day} is within semester ${expectedId}`)
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
    hourDuration: 45,
    breakDuration: 15,
    dayStartsAtHour: 7.5,
    dayEndsAtHour: 21.25,
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
  t.equal(s.dateInSemester(semester, dateIn), true, 'returns true for date within the semester')
  t.equal(s.dateInSemester(semester, dateOut), false, 'returns false for date outside of the semester')
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
