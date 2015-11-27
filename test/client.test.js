import test from 'blue-tape'
import { forEach, toPairs } from 'ramda'
import * as c from '../src/client'

test('browserLanguage', t => {
  const testStrings = {
    cs: ['cs', 'cs-CZ', 'CS_Czech'],
    en: ['en', 'en-US', 'American English', 'foo', false, null],
  }

  forEach(([expectedLang, strings]) => {
    forEach(testString => {
      const actual = c.browserLanguage(testString)
      t.equal(actual, expectedLang, `returns ${expectedLang} on browser lang ${testString}`)
    }, strings)
  }, toPairs(testStrings))

  t.end()
})
