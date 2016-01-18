import test from 'blue-tape'
import R from 'ramda'
import { fmoment } from '../src/date'
import * as sp from '../src/semesterWeeks'

const omitPeriods = R.map(R.omit('periods'))
const pickPeriods = R.map(R.pick('periods'))

test('semesterPeriodsToWeeks()', t => {

  const periods = [
    // type    , startsAt    , endsAt      , weekParity, dayOverride, irregular   weekstamp
    ['teaching', '2015-12-03', '2015-12-20', 'odd'     , undefined  , false],  // 2396-2398
    ['teaching', '2015-12-21', '2015-12-21', 'even'    , 'wednesday', true ],  // 2399
    ['teaching', '2015-12-22', '2015-12-22', 'odd'     , 'tuesday'  , true ],  // 2399
    ['holiday' , '2015-12-23', '2016-01-03', undefined , undefined  , false],  // 2399-2400
    ['teaching', '2016-01-04', '2016-01-06', 'even'    , undefined  , false],  // 2401
    ['exams'   , '2016-01-07', '2016-01-15', undefined , undefined  , false],  // 2402
  ].map(column => ({
    type: column[0],
    startsAt: fmoment(column[1]),
    endsAt: fmoment(column[2]),
    firstWeekParity: column[3],
    firstDayOverride: column[4],
    irregular: column[5],
  }))

  const expected = R.pipe(
    R.always([
      //weekstamp, types                , parity   , teachWeek, periods
      [2396      , ['teaching']         , 'odd'    , 1        , [0]      ],
      [2397      , ['teaching']         , 'even'   , 2        , [0]      ],
      [2398      , ['teaching']         , 'odd'    , 3        , [0]      ],
      [2399      , ['holiday']          , undefined, undefined, [1, 2, 3]],
      [2400      , ['holiday']          , undefined, undefined, [3]      ],
      [2401      , ['teaching', 'exams'], 'even'   , 4        , [4, 5]   ],
      [2402      , ['exams']            , undefined, undefined, [5]      ],
    ]),
    R.map(column => ({
      weekstamp: column[0],
      types: column[1],
      parity: column[2],
      teachingWeek: column[3],
      periods: column[4].map(idx => periods[idx]),
    })),
    R.indexBy(o => o.weekstamp)
  )()

  const actual = sp.semesterPeriodsToWeeks(periods)

  // Omit periods to make diff more readable.
  t.deepEqual(omitPeriods(actual), omitPeriods(expected),
    'converts periods to a map of weekstamp to a week object')

  t.deepEqual(pickPeriods(actual), pickPeriods(expected),
    'week objects contains array of periods')

  t.end()
})
