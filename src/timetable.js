import R from 'ramda'
import moment from 'moment'
import { setDateToZeroTime, weekdayNum } from './date'

export function createTimeline (grid) {
  return {
    start: grid.starts * 3600,
    end: grid.ends * 3600,
    duration: (grid.ends - grid.starts) * 3600,
    hourDuration: grid.lessonDuration * 3600,
    hours: (grid.ends - grid.starts) / grid.lessonDuration,
    firstHour: grid.facultyGrid ? 1 : Math.ceil(grid.starts),
    offset: grid.facultyGrid ? 0 : grid.starts % 1,
  }
}

export function calculateEventPosition (event, timeline) {
  const eventStartDate = new Date(event.startsAt)
  const eventStartTs = eventStartDate.getTime() / 1000
  const eventEndTs = new Date(event.endsAt).getTime() / 1000
  const dayStartTs = setDateToZeroTime(eventStartDate).getTime() / 1000
  const timelineStartTs = dayStartTs + timeline.start

  return {
    position: (eventStartTs - timelineStartTs) / timeline.duration,
    length: (eventEndTs - eventStartTs) / timeline.duration,
  }
}

export function calculateHourLabels (timeline) {
  return R.times(n => ({
    id: 'hlbl-' + n,
    label: timeline.firstHour + n,
    position: (n + timeline.offset) / timeline.hours,
    length: (1 / timeline.hours),
  }), Math.ceil(timeline.hours))
}

export function classModifiers (properties, elementClass) {
  const className = (key) => `${elementClass}--${key.substr(2).toLowerCase()}`

  return R.reduce((acc, key) => {
    if (key.startsWith('is') && !!properties[key]) {
      return `${acc} ${className(key)}`
    }
    return acc
  }, elementClass, R.keys(properties))
}

// groupEventsByDays :: [Event] -> {String: [Event]}
export const groupEventsByDays = R.groupBy(event => {
  return weekdayNum(new Date(event.startsAt))
})

export function calculateOverlap (events) {
  let lastend = moment(0)

  const sortByStart = ({startsAt: lhs}, {startsAt: rhs}) => {
    const lhsD = moment(lhs)
    const rhsD = moment(rhs)
    if (lhsD.isBefore(rhsD)) {
      return -1
    } else {
      return lhsD.isAfter(rhsD) ? 1 : 0
    }
  }

  const sortedevents = R.sort(sortByStart, events)
  let overlap = []

  function markOverlayedEvents (events) {
    R.forEach((event) => {
      event._overlaps = events.length - 1
    }, events)

    if (events.length > 1) {
      events[0]._firstOverlapping = true
    }
  }

  // Compares this event's start with the last end. If the start is after the last end,
  // set appropriate appearances for all events in queue.
  R.forEach((event) => {
    const start = moment(event.startsAt)
    event._overlaps = 0
    event._firstOverlapping = false

    markOverlayedEvents(overlap)

    if (start.isAfter(lastend) || start.isSame(lastend)) {
      overlap = []
    }

    overlap.push(event)

    lastend = moment(event.endsAt)
  }, sortedevents)

  return sortedevents
}

export function eventAppearance (event) {
  let className = 'regular'

  if (event._overlaps >= 3) {
    className = 'quarter'
  } else if (event._overlaps === 2) {
    className = 'third'
  } else if (event._overlaps === 1) {
    className = 'half'
  }

  if (event._firstOverlapping) {
    className += '-first'
  }

  return className
}
