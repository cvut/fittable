import moment from 'moment'
import { curry } from 'ramda'

export const now = () => Object.freeze(new Date())

export function isoDate (date) {
  return moment(date).format('YYYY-MM-DD')
}

function momentWeekRange (date) {
  const m = moment(date)

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

export const shiftDate = curry(function shiftDate (baseDate, kind, offset) {
  return moment(baseDate).add(offset, kind).toDate()
})
