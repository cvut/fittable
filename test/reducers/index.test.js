import test from 'blue-tape'
import R from 'ramda'
import * as actionTypes from '../../src/constants/actionTypes'
import reducer from '../../src/reducers'

test('Initial state', t => {
  const result = reducer(undefined, {type: 'FAUX_ACTION'})
  t.ok(R.is(Object, result.settings), 'settings is an object in initial state')
  t.ok(R.is(Date, result.viewDate), 'viewDate is a Date in initial state')
  t.ok(R.is(Object, result.displayFilters), 'viewFilters is an object in initial state')
  t.end()
})

test('Settings change', t => {
  const action = {
    type: actionTypes.SETTINGS_CHANGE,
    settings: {locale: 'en', layout: 'vertical'},
  }
  const settings = reducer(undefined, action).settings
  t.equal(settings.locale, 'en')
  t.equal(settings.layout, 'vertical')
  t.end()
})

test('viewDate change', t => {
  const viewDate = new Date()
  const action = {
    type: actionTypes.VIEW_DATE_CHANGE,
    viewDate,
  }
  const actualVD = reducer(undefined, action).viewDate
  t.equal(actualVD, viewDate)
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
