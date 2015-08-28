import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../../store'
import Fittable from '../../components/Fittable'
import { options as optionsType } from '../../constants/propTypes'

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
      {() =>
        <Fittable callbacks={this.props.callbacks} locale={this.props.locale}
          layout={this.props.layout}
          colors={this.props.colors}
          days7={this.props.days7}
          facultygrid={this.props.facultygrid}
        />}
    </Provider>
  }
}
