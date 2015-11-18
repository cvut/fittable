import React, { Component } from 'react'
import { Provider } from 'react-redux'

import createStore from './store'
import FittableContainer from './containers/FittableContainer'
import * as callbacks from './callbacks'

const store = createStore()

export default class AppContainer extends Component {

  render () {
    return (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )
  }
}
