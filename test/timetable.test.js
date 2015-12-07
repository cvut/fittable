import test from 'blue-tape'
import * as tt from '../src/timetable'
import R from 'ramda'

test('createTimeline()', t => {
  const grid = {
    starts: 7.5,
    ends: 21.25,
    facultyHours: 15,
    lessonDuration: 1,
    facultyGrid: false,
    hoursStartsAt1: false,
  }

  const expected = {
    start: 27000,
    end: 76500,
    duration: 49500,
    hourDuration: 3600,
    hours: 13.75,
    firstHour: 8,
    offset: 0.5,
  }

  t.deepEqual(tt.createTimeline(grid), expected, 'creates timeline correctly without faculty grid')

  grid.facultyGrid = true
  expected.firstHour = 1
  expected.offset = 0

  t.deepEqual(tt.createTimeline(grid), expected, 'creates timeline correctly with faculty grid')

  t.end()
})

test('calculateEventPosition()', t => {
  const timeline = {
    start: 27000,
    end: 76500,
    duration: 49500,
    hourDuration: 3600,
    hours: 13.75,
    firstHour: 8,
    offset: 0,
  }

  const events = [
    { startsAt: '1970-01-01 07:30:00', endsAt: '1970-01-01 21:15:00', expected: { position: 0, length: 1 } },
    { startsAt: '1970-01-01 14:22:30', endsAt: '1970-01-01 21:15:00', expected: { position: 0.5, length: 0.5 } },
    { startsAt: '1970-01-01 14:22:30', endsAt: '1970-01-01 17:48:45', expected: { position: 0.5, length: 0.25 } },
  ]

  R.forEach(event => {
    t.deepEqual(tt.calculateEventPosition(event, timeline), event.expected, 'calculates correct event position')
  }, events)

  t.end()
})

test('calculateHourLabels()', t => {
  const timeline = {
    start: 27000,
    end: 77400,
    duration: 50400,
    hourDuration: 3600,
    hours: 14,
    firstHour: 8,
    offset: 0.5,
  }

  // Test n, n+1, m-1, m (n=first, m=last)
  const expected = [
    {
      id: 'hlbl-0',
      label: 8,
      position: 0.03571428571428571,
      length: 0.07142857142857142,
    },
    {
      id: 'hlbl-1',
      label: 9,
      position: 0.10714285714285714,
      length: 0.07142857142857142,
    },
    {
      id: 'hlbl-12',
      label: 20,
      position: 0.8928571428571429,
      length: 0.07142857142857142,
    },
    {
      id: 'hlbl-13',
      label: 21,
      position: 0.9642857142857143,
      length: 0.07142857142857142,
    },
  ]

  const result = tt.calculateHourLabels(timeline)
  const rlen = result.length
  const resultSelection = [result[0], result[1], result[rlen - 2], result[rlen - 1]]

  t.deepEqual(resultSelection, expected, 'calculate hour labels for timeline 7:30 - 21:15')

  t.end()
})

test('mapPropertiesToClass()', t => {
  const properties = {
    isA: true,
    isB: false,
    isProperty: true,
    isLoremIpsum: false,
    isDolorSitAmet: true,
  }

  const expected = 'class class--a class--property class--dolorsitamet '

  t.equal(tt.mapPropertiesToClass(properties, 'class'), expected, 'returns properties transformed to classname')
  t.end()
})

test('groupEventsByDays()', t => {
  const events = [
    {startsAt: '2015-12-03 12:00:00'},
    {startsAt: '2015-12-03 14:00:00'},
    {startsAt: '2015-12-04 12:00:00'},
    {startsAt: '2015-12-05 12:00:00'},
  ]

  const expected = {
    3: [
      {startsAt: '2015-12-03 12:00:00'},
      {startsAt: '2015-12-03 14:00:00'},
    ],
    4: [
      {startsAt: '2015-12-04 12:00:00'},
    ],
    5: [
      {startsAt: '2015-12-05 12:00:00'},
    ],
  }

  t.deepEqual(tt.groupEventsByDays(events), expected, 'groups events by weekdaynum')

  t.end()
})

test('calculateOverlap()', t => {
  const expected = [
    {startsAt: '2015-12-03 12:00:00', endsAt: '2015-12-03 13:00:00', _firstOverlapping: false, _overlaps: 0},
    {startsAt: '2015-12-03 13:00:00', endsAt: '2015-12-03 14:00:00', _firstOverlapping: false, _overlaps: 0},
    {startsAt: '2015-12-03 15:00:00', endsAt: '2015-12-03 17:00:00', _firstOverlapping: false, _overlaps: 0},
    {startsAt: '2015-12-03 20:00:00', endsAt: '2015-12-03 20:30:00', _firstOverlapping: false, _overlaps: 0},
    {startsAt: '2015-12-04 12:00:00', endsAt: '2015-12-04 13:00:00', _firstOverlapping: true, _overlaps: 1},
    {startsAt: '2015-12-04 12:30:00', endsAt: '2015-12-04 14:00:00', _firstOverlapping: false, _overlaps: 1},
    {startsAt: '2015-12-04 15:00:00', endsAt: '2015-12-04 17:00:00', _firstOverlapping: true, _overlaps: 1},
    {startsAt: '2015-12-04 16:00:00', endsAt: '2015-12-04 17:00:00', _firstOverlapping: false, _overlaps: 1},
    {startsAt: '2015-12-05 12:00:00', endsAt: '2015-12-05 13:00:00', _firstOverlapping: true, _overlaps: 2},
    {startsAt: '2015-12-05 12:30:00', endsAt: '2015-12-05 13:00:00', _firstOverlapping: false, _overlaps: 2},
    {startsAt: '2015-12-05 12:45:00', endsAt: '2015-12-05 15:00:00', _firstOverlapping: false, _overlaps: 2},
    {startsAt: '2015-12-05 15:00:00', endsAt: '2015-12-05 20:30:00', _firstOverlapping: false, _overlaps: 0},
  ]

  const events = R.map(({startsAt, endsAt}) => {
    return {
      startsAt,
      endsAt,
    }
  }, expected)

  const overlaps = tt.calculateOverlap(events)

  if (events.length !== overlaps.length) {
    t.fail('length of events and overlapped events have to be equal')
  }

  let eventid
  for ( eventid in events ) {
    if (events.hasOwnProperty(eventid)) {
      t.deepEqual(overlaps[eventid], expected[eventid], 'finds correct number of overlaps')
    }
  }

  t.end()
})

test('eventAppearance()', t => {
  const events = [
    {_overlaps: 3, _firstOverlapping: true},
    {_overlaps: 0, _firstOverlapping: false},
  ]

  t.equal(tt.eventAppearance(events[0]), 'quarter-first')
  t.equal(tt.eventAppearance(events[1]), 'regular')
  t.end()
})
