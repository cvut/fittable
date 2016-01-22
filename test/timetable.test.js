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

  ;[//startsAt,  endsAt,     position, length
    ['07:30:00', '21:15:00', 0,        1   ],
    ['14:22:30', '21:15:00', 0.5,      0.5 ],
    ['14:22:30', '17:48:45', 0.5,      0.25],
  ].forEach(([startsAt, endsAt, position, length]) => {
    const event = {startsAt: `1970-01-01 ${startsAt}`, endsAt: `1970-01-01 ${endsAt}`}
    const expected = {position, length}

    t.deepEqual(tt.calculateEventPosition(event, timeline), expected,
      'calculates correct event position')
  })

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

  // Test n, n+1, m-1, m (n=first, m=last)
  const resultSelection = [result[0], result[1], result[rlen - 2], result[rlen - 1]]

  t.deepEqual(resultSelection, expected, 'calculate hour labels for timeline 7:30 - 21:15')
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
    '3': [
      {startsAt: '2015-12-03 12:00:00'},
      {startsAt: '2015-12-03 14:00:00'},
    ],
    '4': [
      {startsAt: '2015-12-04 12:00:00'},
    ],
    '5': [
      {startsAt: '2015-12-05 12:00:00'},
    ],
  }

  t.deepEqual(tt.groupEventsByDays(events), expected, 'groups events by weekdaynum')

  t.end()
})

test('calculateOverlap()', t => {
  const expected = [
    // startsAt, endsAt, _firstOverlapping, _overlaps
    ['2015-12-03 12:00:00', '2015-12-03 13:00:00', false, 0],
    ['2015-12-03 13:00:00', '2015-12-03 14:00:00', false, 0],
    ['2015-12-03 15:00:00', '2015-12-03 17:00:00', false, 0],
    ['2015-12-03 20:00:00', '2015-12-03 20:30:00', false, 0],
    ['2015-12-04 12:00:00', '2015-12-04 13:00:00', true, 1],
    ['2015-12-04 12:30:00', '2015-12-04 14:00:00', false, 1],
    ['2015-12-04 15:00:00', '2015-12-04 17:00:00', true, 1],
    ['2015-12-04 16:00:00', '2015-12-04 17:00:00', false, 1],
    ['2015-12-05 12:00:00', '2015-12-05 13:00:00', true, 2],
    ['2015-12-05 12:30:00', '2015-12-05 13:00:00', false, 2],
    ['2015-12-05 12:45:00', '2015-12-05 15:00:00', false, 2],
    ['2015-12-05 15:00:00', '2015-12-05 20:30:00', false, 0],
  ]

  const events = R.map(([startsAt, endsAt]) => (
    {
      startsAt,
      endsAt,
    }
  ), expected)

  const actual = tt.calculateOverlap(events)
  t.equal(events.length, actual.length, 'length of events and overlapped events have to be equal')

  t.deepEqual(R.pick(['eventid'], actual),
              R.pick(['eventid'], expected),
              'finds correct number of overlaps')

  t.end()
})

test('eventAppearance()', t => {
  const events = [
    {_overlaps: 3, _firstOverlapping: true},
    {_overlaps: 0, _firstOverlapping: false},
  ]
  t.equal(tt.eventAppearance(events[0]),
    'quarter-first', 'sets appearance to quarter-first on 3 overlaps')

  t.equal(tt.eventAppearance(events[1]),
    'regular', 'sets regular on no overlaps')

  t.end()
})
