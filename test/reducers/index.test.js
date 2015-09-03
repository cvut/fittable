import test from 'blue-tape'
import R from 'ramda'
import { SETTINGS_CHANGE } from '../../src/constants/actionTypes'
import reducer from '../../src/reducers'

test('Initial state', t => {
  const result = reducer(undefined, {type: 'FAUX_ACTION'})
  t.ok(R.is(Object, result.settings), 'settings is an object in initial state')
  t.ok(R.is(Date, result.viewDate), 'viewDate is a Date in initial state')
  t.end()
})

test('Settings change', t => {
  const settings = reducer(undefined, {type: SETTINGS_CHANGE, settings: {locale: 'en', layout: 'vertical'}}).settings
  t.equal(settings.locale, 'en')
  t.equal(settings.layout, 'vertical')
  t.end()
})
