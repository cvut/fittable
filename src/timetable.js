import R from 'ramda'
import moment from 'moment'
import { setDateToZeroTime, weekdayNum } from './date'

/**
* @typedef Grid
* @type Object
* @property {number} starts - Start time of the day in decimal hours, e.g. 7:30 is `7.5`.
* @property {number} ends - End time of the day in decimal hours, e.g. 21:30 is `21.5`.
* @property {boolean} facultyGrid - Whether to display grid in faculty hours, or using real clock
*                    hours.
* @property {number} lessonDuration - How long is one teaching hour with a break,
*                    as a fraction of real hour, e.g. two teaching hours are 90 minutes
                     w/ 15 minutes break. Therefore one teaching hour is 52.5 minutes,
                     which is 0.875. If facultyGrid is false, this is 1, i.e. a real clock hour.
* @property {number} facultyHours - How many teaching hours are in one day.
* @property {boolean} hoursStartsAt1 - Whether the first hour is numbered by 1, usually corresponds
*                     to facultyGrid.
*/
/**
 * @typedef Timeline
 * @type Object
 * @property {number} start - Start time of the day (i.e. when classes start) in seconds.
 * @property {number} end - End time of the day (i.e. when classes end) in seconds.
 * @property {number} duration - Total duration of the "teaching day" in seconds.
 * @property {number} hourDuration - Duration of a teaching hour in seconds.
 * @property {number} hours - Count of teaching hours in one day.
 * @property {number} firstHour - Number of the first displayed hour; 1 if faculty grid is enabled,
 *                    real clock hour rounded to the nearest full hour otherwise, e.g. `7:30 → 8`.
 * @property {number} offset - Distance from the firstHour defined as a fraction (0 to 1).
 *                    0 for faculty grid, since the firstHour has no offset.
 *                    Otherwise this is calculated as modulo, e.g. 7:30 becomes 0.5, since
 *                    grid.starts is `7.5` and `7.5 mod 1 = 0.5`.
 */

/**
 * Converts {Grid} to {Timeline} object.
 *
 * @param {Grid} grid
 * @returns {Timeline}
 */
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
    const end = moment(event.endsAt)
    event._overlaps = 0
    event._firstOverlapping = false

    markOverlayedEvents(overlap)

    if (start.isAfter(lastend) || start.isSame(lastend)) {
      overlap = []
    }

    overlap.push(event)

    if (end.isAfter(lastend)) {
      lastend = end
    }
  }, sortedevents)

  markOverlayedEvents(overlap)

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
