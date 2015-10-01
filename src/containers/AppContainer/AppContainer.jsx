import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../../store'
import FittableContainer from '../FittableContainer'

import * as callbacks from '../../callbacks'

export default class AppContainer extends Component {

  render () {
    return (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )
  }
}
