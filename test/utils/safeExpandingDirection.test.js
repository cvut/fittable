import test from 'blue-tape'
import safeExpandingDirection from '../../src/utils/safeExpandingDirection'
import R from 'ramda'

test('safeExpandingDirection()', t => {
  const fakeWindow = { innerWidth: 800, innerHeight: 600 }

  const DEFAULT = '@default'
  const isDefault = R.equals(DEFAULT)

  const testParams = [
    {
      rect: {x: 400, y: 300, width: 200, height: 100},
      expected: { bottom: DEFAULT, right: DEFAULT },
      desc: "returns defaults when element doesn't overflow",
    },
    {
      rect: {x: 700, y: 300, width: 200, height: 100},
      expected: { bottom: DEFAULT, right: false },
      desc: 'returns default-right when element overflows on the right',
    },
    {
      rect: {x: 400, y: 50, width: 200, height: 100},
      expected: { bottom: true, right: DEFAULT },
      desc: 'returns bottom-default when element overflows on the top',
    },
    {
      rect: {x: 199, y: 501, width: 200, height: 100},
      expected: { bottom: false, right: true },
      desc: 'returns top-right when element overflows on the bottom and left',
    },
    {
      rect: {x: 601, y: -300, width: 200, height: 100},
      expected: { bottom: true, right: false },
      desc: 'returns bottom-left when element overflows on the top and right',
    },
    {
      rect: {x: 400, y: 300, width: 401, height: 301},
      expected: { bottom: DEFAULT, right: DEFAULT },
      desc: 'returns defaults when element overflows by 1 px in all directions',
    },
  ]

  testParams.forEach(({ rect, expected, desc }) => {
    ;[ [true, false], [false, true] ].forEach(([right, bottom]) => {

      const defaultDir = { right, bottom }
      const args = [
        [rect.x, rect.y],
        [rect.width, rect.height],
        fakeWindow,
        defaultDir,
      ]

      const _expected = R.evolve({
        right: R.when(isDefault, () => defaultDir.right),
        bottom: R.when(isDefault, () => defaultDir.bottom),
      }, expected)

      t.deepEqual(R.apply(safeExpandingDirection, args), _expected, desc)
    })
  })

  t.end()
})
