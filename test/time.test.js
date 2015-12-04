import test from 'blue-tape'
import * as time from '../src/time'
import R from 'ramda'

test('convertSecondsToTime()', t => {
  const testcases = [
    {seconds: 0, time: [0, 0, 0]},
    {seconds: 1, time: [0, 0, 1]},
    {seconds: 60, time: [0, 1, 0]},
    {seconds: 65, time: [0, 1, 5]},
    {seconds: 3600, time: [1, 0, 0]},
    {seconds: 3601, time: [1, 0, 1]},
  ]

  R.forEach(testcase => {
    t.deepEqual(
      time.convertSecondsToTime(testcase.seconds),
      {h: testcase.time[0], m: testcase.time[1], s: testcase.time[2]},
      `converts correctly ${testcase.seconds}s to time`
    )
  }, testcases)

  t.end()
})
