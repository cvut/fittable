import test from 'blue-tape'
import R from 'ramda'
import * as util from '../src/utils'

test('reduceBy()', t => {

  const input = [
    { name: 'Abby', score: 84 },
    { name: 'Brad', score: 73 },
    { name: 'Chris', score: 89 },
    { name: 'Dianne', score: 99 },
    { name: 'Eddy', score: 58 },
    { name: 'Hannah', score: 78 },
    { name: 'Irene', score: 85 },
  ]
  const expected = {
    A: ['Dianne'],
    B: ['Abby', 'Chris', 'Irene'],
    C: ['Brad', 'Hannah'],
    F: ['Eddy'],
  }

  const grade = (n) => (n < 65) ? 'F' : (n < 70) ? 'D' : (n < 80) ? 'C' : (n < 90) ? 'B' : 'A'
  const byGrade = R.pipe(R.prop('score'), grade)
  const collectNames = (acc, stud) => acc.concat(stud.name)

  t.deepEqual(util.reduceBy(byGrade, collectNames, [], input), expected,
    'splits the list into groups according to the grouping function')

  t.deepEqual(util.reduceBy(byGrade)(collectNames, [])(input), expected,
    'is curried')

  t.deepEqual(util.reduceBy(byGrade, collectNames, [], []), {},
    'returns an empty object if given an empty array')

  t.end()
})

test('renameKeys()', t => {

  const keysMap = { title: 'name', type: 'kind', foo: 'bar' }
  const input = { title: 'Elisia', age: 22, type: 'human' }
  const expected = { name: 'Elisia', age: 22, kind: 'human' }

  const inputClone = { ...input }

  t.deepEqual(util.renameKeys(keysMap, input), expected,
    'renames keys according to the given keysMap')

  t.deepEqual(input, inputClone, 'does not mutate given object')

  t.deepEqual(util.renameKeys(keysMap)(input), expected, 'is curried')

  t.end()
})
