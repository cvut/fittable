import test from 'blue-tape'
import tk from 'timekeeper'
import * as date from '../src/date'

test('now', (t) => {
  tk.freeze()
  const currentDate = new Date()
  t.assert(Object.isFrozen(date.now()), 'returns a frozen object')
  t.deepEqual(date.now().toString(), currentDate.toString(), 'generates current date')
  tk.reset()
  t.end()
})

test('isoDate', (t) => {
  const expectedDate = '2015-09-03'
  const today = new Date(`${expectedDate}T00:00:00+0200`)

  t.equal(date.isoDate(today), expectedDate, 'generates ISO date in a correct timezone')
  t.end()
})

test('weekRange', (t) => {
  const today = new Date('2015-09-03')
  const start = new Date('2015-08-31T00:00:00+0200').toString()
  const end = new Date('2015-09-06T23:59:59+0200').toString()
  const expectedRange = [start, end]

  const actualRange = date.weekRange(today).map(d => d.toString())

  t.deepEqual(actualRange, expectedRange)

  t.end()
})

test('workWeekRange', (t) => {
  const today = new Date('2015-09-03')
  const start = new Date('2015-08-31T00:00:00+0200').toString()
  const end = new Date('2015-09-04T23:59:59+0200').toString()
  const expectedRange = [start, end]

  const actualRange = date.workWeekRange(today).map(d => d.toString())

  t.deepEqual(actualRange, expectedRange)

  t.end()
})

test('isoWeekRange', (t) => {
  const today = new Date('2015-09-03')

  const start = '2015-08-31'
  const end = '2015-09-06'
  const expectedRange = [start, end]

  const actualRange = date.isoWeekRange(today)

  t.deepEqual(actualRange, expectedRange)

  t.end()
})

test('shiftDate', t => {
  const today = new Date('2015-09-03')
  const shiftDateForToday = date.shiftDate(today)
  t.equal(typeof shiftDateForToday, 'function', 'is curried')

  const testParams = [
    {args: ['week', 1], expected: '2015-09-10'},
    {args: ['weeks', -2], expected: '2015-08-20'},
    {args: ['months', +3], expected: '2015-12-03'},
    {args: ['months', -12], expected: '2014-09-03'},
  ]

  testParams.forEach(({args, expected}) => {
    const actual = shiftDateForToday(...args)
    t.equal(date.isoDate(actual), expected, `shifts by ${args[1]} ${args[0]}`)
  })

  t.end()
})

test('weekdayNum()', t => {
  const day = new Date('2015-09-06') // Sunday

  const expected = 6
  const actual = date.weekdayNum(day)

  t.equal(actual, expected, 'returns a 0-indexed ISO weekday number')
  t.end()
})
