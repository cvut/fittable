import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { compose } from 'redux'

import store from '../../store'
import FittableContainer from '../FittableContainer'
import { options as optionsType } from '../../constants/propTypes'

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default class AppContainer extends Component {
  static propTypes = optionsType

  static defaultProps = {
    locale: 'en',
    layout: 'horizontal',
    colors: false,
    days7: false,
    facultygrid: true,
  }

  render () {
    const main = (
      <Provider store={store}>
        <FittableContainer callbacks={this.props.callbacks} locale={this.props.locale} />
      </Provider>
    )

    if (__DEV__) {
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
