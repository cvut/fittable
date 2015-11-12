/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 */

import React from 'react'
import ReactDOM from 'react-dom'

import Counterpart from 'counterpart'

import 'moment/locale/cs'
import LocaleCS from './locales/cs.json'
import LocaleEN from './locales/en.json'

import AppContainer from './containers/AppContainer'

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

ReactDOM.render(<AppContainer />, rootElement)
