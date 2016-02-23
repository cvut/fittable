import { createClass, PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import R from 'ramda'
import safeExpandingDirection from '../utils/safeExpandingDirection'

import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT } from '../constants/events'

function getExpandingDirection (ref, defaultDir) {
  const expandableDOM = findDOMNode(ref)
  const boundingRect = expandableDOM.getBoundingClientRect()
  const rect = { x: 0, y: 0, width: EVENT_MAX_WIDTH, height: EVENT_MAX_HEIGHT }

  if (expandableDOM) {
    rect.x = boundingRect.left
    rect.y = boundingRect.top
  }

  return safeExpandingDirection(
    rect,
    global,
    defaultDir)
}

const PositionedExpander = createClass({
  propTypes: {
    expanded: PropTypes.bool,
    left: PropTypes.number,
    top: PropTypes.number,
    children: PropTypes.element.isRequired,
  },

  displayName: 'PositionedExpander',

  defaultExpanding: { horizontal: 1, vertical: 1 },

  getDefaultProps: () => ({
    expanded: false,
  }),

  getInitialState () {
    return { expandingDirection: this.defaultExpanding }
  },

  componentWillReceiveProps ({ expanded }) {
    let expandingDirection = this.defaultExpanding
    if (expanded && this.refs && this.refs.expandable) {
      expandingDirection = getExpandingDirection(this.refs.expandable, this.defaultExpanding)
    }

    this.setState({ expandingDirection })
  },

  render () {
    const expandingDirection = this.state.expandingDirection

    const childrenProps = {
      expanded: this.props.expanded,
      horizontalAlign: -expandingDirection.horizontal,
      verticalAlign: -expandingDirection.vertical,
      ref: 'expandable',
    }

    return cloneElement(this.props.children, childrenProps)
  },
})

export default PositionedExpander
