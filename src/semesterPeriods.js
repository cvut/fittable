import moment from 'moment-timezone'
import R from 'ramda'
import { withinDates } from './date'

export function periodFromDate (date, periods) {
  const includesDate = (period) => withinDates(period.starts_at, period.ends_at, date)
  return R.find(includesDate, periods)
}

export function semesterWeek (date, semester) {
  const mD = moment(date)
  const semesterStart = moment(semester.startsOn)

  if (mD.isBefore(semesterStart)) {
    return null
  }

  return mD.diff(semesterStart, 'weeks') + 1
}

export function periodWeekParity (date, semester) {
  const diffEven = semesterWeek(date, semester) % 2 === 0
  const fweekEven = semester.firstWeekParity === 'even'

  return (fweekEven === diffEven) ? 'odd' : 'even'
}

export function weekProperties (viewDate, semester) {
  const period = R.unless(R.isNil, R.partial(periodFromDate, [viewDate]), semester.periods)

  if (!period) {
    return { weekParity: null, weekNum: null, weekType: null }
  }

  return {
    weekParity: periodWeekParity(viewDate, semester),
    weekNum: semesterWeek(viewDate, semester),
    weekType: period.type,
  }
}
