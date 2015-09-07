import test from 'blue-tape'
import * as manip from '../src/dataManipulation'

test('invertLinkNames()', t => {
  const origData = {
    teachers: [
      {
        id: 'vomackar',
        name: {
          cs: 'Karel Vomáčka',
          en: 'Carl Vomacka',
        },
      },
    ],
    courses: [
      {
        id: 'MI-RUB',
        name: {
          cs: 'Programování v Ruby',
          en: 'Programming in Ruby',
        },
      },
    ],
    exceptions: [
      {
        id: 42,
        name: 'An Exception',
      },
    ],
  }

  const expected = {
    cs: {
      teachers: {
        vomackar: 'Karel Vomáčka',
      },
      courses: {
        'MI-RUB': 'Programování v Ruby',
      },
      exceptions: {
        42: 'An Exception',
      },
    },
    en: {
      teachers: {
        vomackar: 'Carl Vomacka',
      },
      courses: {
        'MI-RUB': 'Programming in Ruby',
      },
      exceptions: {
        42: 'An Exception',
      },
    },
  }

  const actual = manip.invertLinkNames(origData)

  t.deepEqual(actual, expected, 'inverts link names by locale')
  t.end()
})
