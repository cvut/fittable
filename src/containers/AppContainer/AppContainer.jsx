import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../../store'
import FittableContianer from '../FittableContainer'
import { options as optionsType } from '../../constants/propTypes'


// React components for Redux DevTools
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

  render() {
    return (
      <div>
        <Provider store={store}>
          <FittableContianer callbacks={this.props.callbacks} locale={this.props.locale} />
        </Provider>
        // FIXME: include this only in dev
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}
