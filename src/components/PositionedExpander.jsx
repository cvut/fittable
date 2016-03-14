import { createClass, PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import safeExpandingDirection from '../utils/safeExpandingDirection'
import R from 'ramda'

import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT } from '../constants/events'

function getExpandingDirection (ref, defaultDir) {
  const expandableDOM = findDOMNode(ref)

  const point = expandableDOM
      ? R.props(['left', 'top'], expandableDOM.getBoundingClientRect())
      : [0, 0]

  return safeExpandingDirection(
    point,
    [EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT],
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

  defaultExpanding: { right: true, bottom: true },

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
    const expandingDir = this.state.expandingDirection

    const childrenProps = {
      expanded: this.props.expanded,
      align: {
        top: expandingDir.bottom,
        left: expandingDir.right,
      },
      ref: 'expandable',
    }

    return cloneElement(this.props.children, childrenProps)
  },
})

export default PositionedExpander
