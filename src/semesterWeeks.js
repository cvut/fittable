import R from 'ramda'
import { fmoment } from './date'
import { forEachWithIndex, reduceBy } from './utils'

// The reference point for weeks since the epoch.
const referenceDate = fmoment(0).startOf('isoWeek').freeze()


/**
 * Returns number of ISO weeks since the start of the Unix epoch. Note that the
 * week 1 starts on 1969-12-29.
 *
 * @see http://www.epochconverter.com/date-and-time/weeknumbers-by-year.php?year=1970
 * @sig Moment -> Number
 */
const weeksSinceEpoch = (date) => referenceDate.diff(date, 'weeks') * -1

/**
 * Returns an array of Weekstamps from start to end of the given
 * Semester Period.
 *
 * @sig Period -> [Number]
 */
const periodWeeksRange = ({ startsAt, endsAt }) => {
  return R.range(weeksSinceEpoch(startsAt), weeksSinceEpoch(endsAt) + 1)
}

// @sig Period -> Boolean
const isRegularPeriod = (period) => !period.irregular

// @sig Week -> Boolean
const isTeachingWeek = (week) => week.types.includes('teaching')

// @sig Number -> String
const parityName = (num) => num % 2 ? 'odd' : 'even'

// @sig String -> Number | undefined
const parityToNum = (str) => {
  switch (str) {
    case 'even': return 0
    case 'odd': return 1
    default: return undefined
  }
}

/**
 * Computes a parity of the given week within a regular period with defined
 * firstWeekParity (i.e. teaching period). If there's no Period with the
 * firstWeekParity property, the function returns undefined.
 *
 * The calculation is based on difference between the period's start Weekstamp
 * and the given date's Weekstamp, shifted by the firstWeekParity:
 *
 *   (weekstamp(date) - weekstamp(startsAt) + firstWeekParity) mod 2
 *
 * @sig ([Period], Number) -> String | undefined
 */
const weekParity = (periods, weekstamp) => {
  const period = periods.find(R.both(
    isRegularPeriod,
    R.prop('firstWeekParity')
  ))

  if (period) {
    const weeksSinceStart = weekstamp - weeksSinceEpoch(period.startsAt)
    const parity = (weeksSinceStart + parityToNum(period.firstWeekParity)) % 2

    return parityName(parity)
  }
}

// @sig [Period] -> [String]
const regularPeriodsTypes = R.pipe(
  R.filter(isRegularPeriod),
  R.map(p => p.type),
  R.uniq
)

/**
 * Returns a new Semester Week object with the given Semester Periods that
 * belongs to the calendar week specified by the weekstamp.
 *
 * @sig (Number, [Period]) -> SemesterWeek
 */
const createWeek = (weekstamp, periods) => ({
  weekstamp,
  periods,
  types: regularPeriodsTypes(periods),
  parity: weekParity(periods, weekstamp),
  teachingWeek: undefined,
})

/**
 * Groups Semester Periods into calendar weeks numbered by a Weekstamp (number
 * of weeks since the epoch). Each Semester Period can be present in multiple
 * calendar weeks (it's a many-to-many mapping).
 *
 * @sig [Period] -> {String: [Period]}
 */
const periodsByWeeks = R.pipe(
  R.sortBy(p => p.startsAt),
  R.chain(p => R.xprod(periodWeeksRange(p), [p])),
  reduceBy(R.head, (acc, pair) => acc.concat(pair[1]), [])
)

/**
 * Transforms the Periods of a single Semester into the Semester Weeks indexed
 * by a Weekstamp (number of weeks since the epoch).
 *
 * @sig [Period] -> {String: SemesterWeek}
 */
export const semesterPeriodsToWeeks = R.pipe(
  periodsByWeeks,
  R.mapObjIndexed((periods, key) => {
    return createWeek(key *1, periods)
  }),
  R.tap(R.pipe(
    R.values,
    R.filter(isTeachingWeek),
    R.sortBy(o => o.weekstamp),
    forEachWithIndex((week, idx) => {
      week.teachingWeek = idx + 1
    })
  ))
)
