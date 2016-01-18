import R from 'ramda'
import { withinDates } from './date'

const toDate = d => new Date(d)

const semesterInterval = R.props(['startsOn', 'endsOn'])
export const dateInSemester = (semester, date) => withinDates(...semesterInterval(semester), date)

export function findSemester (semesters, date) {
  // XXX: must be wrapped since we have a different order
  const predicate = (sem) => dateInSemester(sem, date)

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
    startsOn: semester.startsOn,
    endsOn: semester.endsOn,
    season: semesterSeason(semester.semester),
    years: semesterYears(semester.semester),
    grid: {
      starts: dayStartsAtHour,
      ends: dayEndsAtHour,
      lessonDuration,
    },
    periods: semester.periods,
    valid: true,
  }
}

export function semesterName (translate, semester) {
  if (!semester || !semester.valid || !semester.season || !semester.years) {
    return null
  }
  const translateKey = `${semester.season}_sem`
  const academicYear = `${semester.years[0]}/${semester.years[1] % 100}`

  return translate(translateKey, { year: academicYear })
}
