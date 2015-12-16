import moment from 'moment-timezone'
import R from 'ramda'

import { TZ } from './config'

export const now = () => Object.freeze(new Date())

export function strToDate (date) {
  return new Date(date)
}

export function isoDate (date) {
  return moment.tz(date, TZ).format('YYYY-MM-DD')
}

function momentWeekRange (date) {
  const m = moment.tz(date, TZ)

  const weekStart = m.clone().startOf('isoWeek')
  const weekEnd = m.clone().endOf('isoWeek')

  return [weekStart, weekEnd]
}

export function weekRange (date) {
  return momentWeekRange(date).map(m => m.toDate())
}

export function workWeekRange (date) {
  const [weekStart, weekEnd] = momentWeekRange(date)

  return [weekStart, weekEnd.subtract(2, 'days')].map(m => m.toDate())
}

export function isoWeekRange (date) {
  return weekRange(date).map(d => isoDate(d))
}

export const shiftDate = R.curry((baseDate, kind, offset) => {
  return moment.tz(baseDate, TZ).add(offset, kind).toDate()
})

export function weekdayNum (date) {
  // getDay returns 0 for Sunday, 1 Monday etc.
  // thus we need to shift by 6 and mod by 7
  return (date.getDay() + 6) % 7
}

export function compareDate (a, b) {
  const mA = moment(a)
  const mB = moment(b)
  if (mA.isBefore(mB, 'day')) {
    return -1
  }
  if (mA.isAfter(mB, 'day')) {
    return 1
  }

  return 0
}

export function withinDates (min, max, date) {
  const mDate = moment(date)
  return mDate.isBetween(min, max, 'day') || mDate.isSame(min, 'day') || mDate.isSame(max, 'day')
}

export function setDateToZeroTime (date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}

export function weekStartDate (date) {
  return moment(date).startOf('isoWeek').toDate()
}
