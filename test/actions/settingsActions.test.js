import test from 'blue-tape'
import { SETTINGS_CHANGE } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/settingsActions'

function expectedVal (payload) {
  return {type: SETTINGS_CHANGE, settings: payload}
}

test('changeSettings', (t) => {
  const payload = {locale: 'cs', eventsColors: true}
  const result = actions.changeSettings(payload)
  t.deepEqual(result, expectedVal(payload))
  t.end()
})

test('setLocale', (t) => {
  t.deepEqual(actions.setLocale('cs'), expectedVal({locale: 'cs'}))
  t.end()
})

test('setEventsColors', (t) => {
  t.deepEqual(actions.setEventsColors(true), expectedVal({eventsColors: true}))
  t.end()
})

test('setFullWeek', (t) => {
  t.deepEqual(actions.setFullWeek(true), expectedVal({fullWeek: true}))
  t.end()
})

test('setFacultyGrid', (t) => {
  t.deepEqual(actions.setFacultyGrid(true), expectedVal({facultyGrid: true}))
  t.end()
})

test('setLayout', (t) => {
  t.deepEqual(actions.setLayout('horizontal'), expectedVal({layout: 'horizontal'}))
  t.end()
})
