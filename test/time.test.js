import test from 'blue-tape'
import * as time from '../src/time'

test('convertSecondsToTime()', t => {
  [//seconds, h, m, s]
    [0,       0, 0, 0],
    [1,       0, 0, 1],
    [60,      0, 1, 0],
    [65,      0, 1, 5],
    [3600,    1, 0, 0],
    [3601,    1, 0, 1],
  ].forEach(([seconds, h, m, s]) => {
    t.deepEqual(
      time.convertSecondsToTime(seconds), {h, m, s}, `converts correctly ${seconds}s to time`
    )
  })

  t.end()
})
