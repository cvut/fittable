import test from 'blue-tape'
import * as cookie from '../../src/utils/cookie'

test('cookie.get()', t => {
  const emoji = '😽'
  const emojiUri = '%F0%9F%98%BD'
  const cookieStr = 'oauth_access_token=long-uuid; ' +
    'weird\[key\{=value; ' +
    `emoji=${emojiUri}`

  t.equal(cookie.get('oauth_access_token', cookieStr), 'long-uuid', 'extracts a cookie value')
  t.equal(cookie.get('weird[key{', cookieStr), 'value', 'escapes brackets in key')
  t.equal(cookie.get('emoji', cookieStr), emoji, 'escapes URI encoded values')
  t.end()
})
