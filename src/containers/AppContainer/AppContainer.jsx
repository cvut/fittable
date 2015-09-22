import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { compose } from 'redux'

import store from '../../store'
import FittableContainer from '../FittableContainer'
import { options as optionsType } from '../../constants/propTypes'

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

import * as callbacks from '../../callbacks/faux'

export default class AppContainer extends Component {

  render () {
    const main = (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )

    if (process.env.NODE_ENV === 'development') {
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
