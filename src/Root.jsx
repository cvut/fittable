import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { get as getCookie } from './utils/cookie'

import createStore from './store'
import FittableContainer from './containers/FittableContainer'
import * as callbacks from './callbacks'

const initialState = {
  user: {
    id: getCookie('oauth_nickname') || null,
    acccessToken: getCookie('oauth_access_token') || null,
  },
}
const store = createStore(initialState)

export default class AppContainer extends Component {

  render () {
    return (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )
  }
}
