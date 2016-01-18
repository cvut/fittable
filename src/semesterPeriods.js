import R from 'ramda'
import { fmoment } from './date'
import { forEachWithIndex, reduceBy } from './utils'

// The reference point for weeks since the epoch.
const referenceDate = fmoment(0).startOf('isoWeek').freeze()


// weeksSinceEpoch :: Moment -> Number
const weeksSinceEpoch = (date) => referenceDate.diff(date, 'weeks') * -1

// periodWeeksRange :: Period -> [Number, Number]
const periodWeeksRange = ({ startsAt, endsAt }) => {
  return R.range(weeksSinceEpoch(startsAt), weeksSinceEpoch(endsAt) + 1)
}

// isRegularPeriod :: Period -> Boolean
const isRegularPeriod = (period) => !period.irregular

// isTeachingWeek :: Week -> Boolean
const isTeachingWeek = (week) => week.types.includes('teaching')

// parityName :: Number -> String
const parityName = (num) => num % 2 ? 'odd' : 'even'

// parityToNum :: String -> Number | undefined
const parityToNum = (str) => {
  switch (str) {
    case 'even': return 0
    case 'odd': return 1
    default: return undefined
  }
}

// weekParity :: ([Period], Number) -> String
const weekParity = (periods, weekstamp) => {
  const period = periods.find(R.allPass([
    isRegularPeriod,
    R.prop('firstWeekParity')
  ]))

  if (period) {
    const firstParity = parityToNum(period.firstWeekParity)
    const parity = (weeksSinceEpoch(period.startsAt) + weekstamp + firstParity) % 2

    return parityName(parity)
  }
}

// regularPeriodsTypes :: [Period] -> [String]
const regularPeriodsTypes = R.pipe(
  R.filter(isRegularPeriod),
  R.map(p => p.type),
  R.uniq
)

// createWeek :: (Number, [Period]) -> Week
const createWeek = (weekstamp, periods) => ({
  weekstamp,
  periods,
  types: regularPeriodsTypes(periods),
  parity: weekParity(periods, weekstamp),
  teachingWeek: undefined,
})

// periodsByWeek :: [Period] -> {String: [Period]}
const periodsByWeek = R.pipe(
  R.sortBy(p => p.startsAt),
  R.chain(p => R.xprod(periodWeeksRange(p), [p])),
  reduceBy(R.head, (acc, pair) => acc.concat(pair[1]), [])
)

// semesterWeeks :: [Period] -> {String: Week}
export const semesterWeeks = R.pipe(
  periodsByWeek,
  R.mapObjIndexed((periods, key) => {
    return createWeek(key *1, periods)
  }),
  R.tap(R.pipe(
    R.values, R.filter(isTeachingWeek),
    R.sortBy(o => o.weekstamp),
    forEachWithIndex((week, idx) => {
      week.teachingWeek = idx + 1
    })
  ))
)
