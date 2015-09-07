/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer'

import Counterpart from 'counterpart'
import Moment from 'moment'
import 'moment/locale/cs'

import LocaleCS from './locales/cs.json'
import LocaleEN from './locales/en.json'

function fittable (containerElId, options) {

  // Register translations
  Counterpart.registerTranslations('en', LocaleEN)
  Counterpart.registerTranslations('cs', Object.assign(LocaleCS, {
    counterpart: {
      pluralize: (entry, count) => {
        entry[ (count === 0 && 'zero' in entry) ? 'zero' : (count === 1) ? 'one' : 'other' ]
      },
    },
  }))

  // Set locale
  Counterpart.setLocale(options.locale)
  Moment.locale(options.locale)

  // Create root fittable element
  var element = React.createElement(AppContainer, options)
  var rendered = ReactDOM.render(element, document.getElementById(containerElId))

  // Return fittable instance
  return rendered
}

global.fittable = fittable
export default fittable
