import test from 'blue-tape'
import * as semester from '../src/semester'

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
    const actual = semester.findSemester(semesters, day)

    t.equal(actual.id, expectedId, `day ${day} is within semester ${expectedId}`)
  })

  t.end()
})
