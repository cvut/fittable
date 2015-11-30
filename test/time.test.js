import test from 'blue-tape'
import * as time from '../src/time'

test('convertSecondsToTime()', t => {
  t.deepEqual(time.convertSecondsToTime(0), {h: 0, m: 0, s: 0}, 'converts correctly 0s to 0:00:00')
  t.deepEqual(time.convertSecondsToTime(60), {h: 0, m: 1, s: 0}, 'converts correctly 60s to 0:01:00')
  t.deepEqual(time.convertSecondsToTime(65), {h: 0, m: 1, s: 5}, 'converts correctly 65s to 0:01:05')
  t.deepEqual(time.convertSecondsToTime(3600), {h: 1, m: 0, s: 0}, 'converts correctly 3600s to 1:00:00')
  t.deepEqual(time.convertSecondsToTime(3601), {h: 1, m: 0, s: 1}, 'converts correctly 3601s to 1:00:01')
  t.end()
})
