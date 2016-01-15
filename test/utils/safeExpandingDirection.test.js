import test from 'blue-tape'
import safeExpandingDirection from '../../src/utils/safeExpandingDirection'
import { apply } from 'ramda'

test('safeExpandingDirection()', t => {
  const defaultDirection = { horizontal: 0, vertical: 0 }
  const fakeWindow = { innerWidth: 1366, innerHeight: 768 }

  // args: [left, top], [width, height]
  const testParams = [
    {
      args: [[1266, 0], [200, 200]],
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when el exceeds on the right',
    },
    {
      args: [[1266, 750], [200, 200]],
      expected: { horizontal: -1, vertical: -1 },
      desc: 'returns top-left when el exceeds right and bottom',
    },
    {
      args: [[1266, -300], [200, 200]],
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when el exceeds right and top',
    },
    {
      args: [[683, 384], [684, 385]],
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el exceeds by 1 px in all directions',
    },
    {
      args: [[684, 0], [683, 200]],
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when the el exceeds only on the right by 1 px',
    },
    {
      args: [[683, 384], [682, 383]],
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el has 1 px space on the right and bottom',
    },
    {
      args: [[683, 384], [200, 400]],
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el is centered and doesn\'t exceeds',
    },
  ]

  testParams.forEach(({args, expected, desc}) => {
    args = [
      ...args,
      fakeWindow,
      defaultDirection,
    ]

    t.deepEqual(apply(safeExpandingDirection, args), expected, desc)
  })

  t.end()
})
