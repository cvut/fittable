import R from 'ramda'
import { withinDates } from './date'

const semesterInterval = R.props(['startsAt', 'endsAt'])

const toDate = d => new Date(d)

const semesterDates = R.pipe(semesterInterval, R.map(toDate))

export function findSemester (semesters, date) {
  const predicate = sem => withinDates(...semesterDates(sem), date)

  return R.find(predicate, semesters)
}

export function semesterSeason (semesterId) {
  const lastChar = semesterId.slice(-1)
  if (lastChar === '1') {
    return 'winter'
  }
  return 'summer'
}

export function semesterYears (semesterId) {
  const yy = semesterId.slice(1, 3)
  const year = parseInt(`20${yy}`, 10) // TODO: make this Y2100 compliant
  return [year, year + 1]
}

export function convertRawSemester (semester) {
  const { dayStartsAtHour, dayEndsAtHour, hourDuration, breakDuration } = semester
  const hDur = hourDuration / 60
  const bDur = breakDuration / 60
  const lessonDuration = ((hDur * 2) + bDur) / 2
  return {
    id: semester.id,
    startsOn: semester.startsAt,
    endsOn: semester.endsAt,
    season: semesterSeason(semester.semester),
    years: semesterYears(semester.semester),
    grid: {
      starts: dayStartsAtHour,
      ends: dayEndsAtHour,
      lessonDuration,
    },
    periods: [
      {
        type: 'exams',
        startsOn: semester.examsStartsAt,
        endsOn: semester.examsEndsAt,
      },
    ],
  }
}
