/**
 * High-order component which periodically updates
 */
import { createClass, PropTypes, Children, cloneElement } from 'react'
import { now } from '../date'

const PeriodicUpdate = createClass({
  propTypes: {
    period: PropTypes.number,
    children: PropTypes.element.isRequired,
  },

  displayName: 'PeriodicUpdate',

  getDefaultProps: () => ({
    period: 1000, // period in ms for setTimeout
  }),

  getInitialState: () => ({
    currentDate: now(),
    timeoutObject: null,
  }),

  componentDidMount () {
    this.setState({ timeoutObject: global.setTimeout(this.updateDate, this.props.period) })
  },

  componentWillUnmount () {
    const { timeoutObject } = this.state
    if (timeoutObject) {
      global.clearTimeout(timeoutObject)
    }
  },

  updateDate () {
    this.setState({
      currentDate: now(),
      timeoutObject: global.setTimeout(this.updateDate, this.props.period),
    })
  },

  render () {
    const { children } = this.props
    const { currentDate } = this.state

    const child = Children.only(children)
    return cloneElement(child, { currentDate })
  },
})

export default PeriodicUpdate
