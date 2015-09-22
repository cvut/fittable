import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../../store'
import FittableContainer from '../FittableContainer'

let callbacks
// XXX: CJS for conditional import
if (process.env.FITTABLE_SOURCE === 'sirius') {
  callbacks = require('../../callbacks/sirius')
} else {
  callbacks = require('../../callbacks/faux')
}

export default class AppContainer extends Component {

  render () {
    const main = (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )

    if (process.env.NODE_ENV === 'development') {
      // XXX: CJS for conditional import
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')

      return (
        <div>
          {main}
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        </div>
      )
    }
    return main
  }
}
