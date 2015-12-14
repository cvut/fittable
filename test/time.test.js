import test from 'blue-tape'
import * as time from '../src/time'
import R from 'ramda'

test('convertSecondsToTime()', t => {
  const testCases = [
    {seconds: 0, time: [0, 0, 0]},
    {seconds: 1, time: [0, 0, 1]},
    {seconds: 60, time: [0, 1, 0]},
    {seconds: 65, time: [0, 1, 5]},
    {seconds: 3600, time: [1, 0, 0]},
    {seconds: 3601, time: [1, 0, 1]},
  ]

  R.forEach(testCase => {
    const [h, m, s] = testCase.time
    t.deepEqual(
      time.convertSecondsToTime(testCase.seconds),
      {h, m, s},
      `converts correctly ${testCase.seconds}s to time`
    )
  }, testCases)

  t.end()
})
