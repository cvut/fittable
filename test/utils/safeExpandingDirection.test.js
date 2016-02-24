import test from 'blue-tape'
import safeExpandingDirection from '../../src/utils/safeExpandingDirection'
import { apply } from 'ramda'

test('safeExpandingDirection()', t => {
  const defaultDirection = { horizontal: 0, vertical: 0 }
  const fakeWindow = { innerWidth: 1366, innerHeight: 768 }

  // args: [left, top], [width, height]
  const testParams = [
    {
      rect: {x: 683, y: 384, width: 200, height: 400},
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el is centered and doesn\'t overflow',
    },
    {
      rect: {x: 1266, y: 0, width: 200, height: 200},
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when el overflows on the right',
    },
    {
      rect: {x: 1266, y: 750, width: 200, height: 200},
      expected: { horizontal: -1, vertical: -1 },
      desc: 'returns top-left when el overflows right and bottom',
    },
    {
      rect: {x: 1266, y: -300, width: 200, height: 200},
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when el overflows right and top',
    },
    {
      rect: {x: 683, y: 384, width: 684, height: 385},
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el overflows by 1 px in all directions',
    },
    {
      rect: {x: 684, y: 0, width: 683, height: 200},
      expected: { horizontal: -1, vertical: 1 },
      desc: 'returns bottom-left when the el overflows only on the right by 1 px',
    },
    {
      rect: {x: 683, y: 384, width: 682, height: 383},
      expected: { horizontal: 0, vertical: 0 },
      desc: 'returns default when the el has 1 px space on the right and bottom',
    },
  ]

  testParams.forEach(({rect, expected, desc}) => {
    const args = [
      rect,
      fakeWindow,
      defaultDirection,
    ]

    t.deepEqual(apply(safeExpandingDirection, args), expected, desc)
  })

  t.end()
})
