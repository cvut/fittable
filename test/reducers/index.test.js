import test from 'blue-tape'
import { type } from 'ramda'
import * as actionTypes from '../../src/constants/actionTypes'
import reducer from '../../src/reducers'

test('Initial state', t => {
  const result = reducer(undefined, {type: 'FAUX_ACTION'})
  t.is(type(result.settings), 'Object')
  t.is(type(result.displayFilters), 'Object')
  t.is(type(result.data), 'Object')
  t.is(type(result.ui), 'Object')
  t.is(type(result.search), 'Object')
  t.is(type(result.semester), 'Object')
  t.is(type(result.client), 'Object')
  t.is(type(result.user), 'Object')
  t.end()
})

test('displayFilters change', t => {
  const action = {
    type: actionTypes.DISPLAY_FILTERS_CHANGE,
    displayFilters: {
      laboratory: false,
      other: true,
    },
  }

  const actual = reducer(undefined, action).displayFilters

  t.equal(actual.laboratory, false, 'changes given filter to false (laboratory)')
  t.equal(actual.tutorial, true, 'returns also other filters (tutorial)')
  t.equal(actual.other, true, 'keeps the original filter state (other)')

  t.end()
})
