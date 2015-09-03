import test from 'blue-tape'
import tk from 'timekeeper'
import * as date from '../src/date'
test('now', (t) => {
  tk.freeze()
  const currentDate = new Date()
  t.assert(Object.isFrozen(date.now()), 'returns a frozen object')
  t.deepEqual(currentDate.toString(), date.now().toString())
  tk.reset()
  t.end()
})
