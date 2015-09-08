import R from 'ramda'
import { withinDates } from './date'

const semesterInterval = R.props(['startsAt', 'endsAt'])

const toDate = d => new Date(d)

const semesterDates = R.pipe(semesterInterval, R.map(toDate))

export function findSemester (semesters, date) {
  const predicate = sem => withinDates(...semesterDates(sem), date)

  return R.find(predicate, semesters)
}
