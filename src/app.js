import Raven from 'raven-js'

if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
  Raven.config(process.env.SENTRY_DSN).install()
}

import React from 'react'
import ReactDOM from 'react-dom'

import Counterpart from 'counterpart'

import 'moment/locale/cs'
import LocaleCS from './locales/cs.json'
import LocaleEN from './locales/en.json'

import Root from './Root'

const rootElement = document.getElementById('fittable')

// Register translations
Counterpart.registerTranslations('en', LocaleEN)
Counterpart.registerTranslations('cs', Object.assign(LocaleCS, {
  counterpart: {
    pluralize: (entry, count) => {
      entry[ (count === 0 && 'zero' in entry) ? 'zero' : (count === 1) ? 'one' : 'other' ]
    },
  },
}))
// Counterpart.setLocale(options.locale)
// Moment.locale(options.locale)

ReactDOM.render(<Root />, rootElement)
