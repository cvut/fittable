// Based on https://github.com/GetExpert/redux-blog-example
// Published under MIT license
// Copyright 2015 GetExpert

export function get (name, cookies = undefined) {
  if (cookies === undefined) {
    cookies = global.document.cookie
  }

  const re = new RegExp(['(?:^|; )',
    name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
    '=([^;]*)',
  ].join(''))

  const matches = cookies.match(re)

  return matches ? global.decodeURIComponent(matches[1]) : null
}
