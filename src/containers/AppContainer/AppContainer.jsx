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
    return (
      <Provider store={store}>
        <FittableContainer callbacks={callbacks} />
      </Provider>
    )
  }
}
