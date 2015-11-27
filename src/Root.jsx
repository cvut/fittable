import React, { Component } from 'react'
import { Provider } from 'react-redux'

import createStore from './store'
import FittableContainer from './containers/FittableContainer'
import * as callbacks from './callbacks'
import { browserLanguage } from './client'

const initialState = {
  settings: {
    locale: browserLanguage(window.navigator.userLanguage || window.navigator.language),
  },
}
const store = createStore(initialState)

export default class Root extends Component {

  render () {
    return (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )
  }
}
