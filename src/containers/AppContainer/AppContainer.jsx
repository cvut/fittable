import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../../store'
import FittableContianer from '../FittableContainer'
import { options as optionsType } from '../../constants/propTypes'

const store = configureStore()

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
    return <Provider store={store}>
      <FittableContianer callbacks={this.props.callbacks} locale={this.props.locale} />
    </Provider>
  }
}
