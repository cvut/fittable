/**
 * Component providing absolute positioning and children expanding functionality
 * with boundary overflow checking
 */
import { createClass, PropTypes, Children, cloneElement } from 'react'
// import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT, EVENT_HEAD_HEIGHT } from '../constants/events'

const PositionedExpander = createClass({
  propTypes: {
    open: PropTypes.bool,
    children: PropTypes.element.isRequired,
    position: PropTypes.arrayOf(PropTypes.number),
    screenSize: PropTypes.number,
    defaultDirection: PropTypes.number,
  },

  displayName: 'PositionedExpander',

  getDefaultProps: () => ({
    open: false,
    defaultDirection: 1,
  }),

  renderChildren () {
    const { children, open } = this.props

    return Children.map(children, (child) => {
      return cloneElement(child, { open })
    })
  },

  render () {

  },

})

export default PositionedExpander
