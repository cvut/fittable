import { createClass, PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import safeExpandingCorner from '../utils/safeExpandingCorner'
import R from 'ramda'

import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT } from '../constants/events'

function getExpandingCorner (ref, defaultDir) {
  const expandableDOM = findDOMNode(ref)
  let point = [0, 0]

  if (expandableDOM) {
    point = R.props(['left', 'top'], expandableDOM.getBoundingClientRect())
  }

  return safeExpandingCorner(
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
      expandingDirection = getExpandingCorner(this.refs.expandable, this.defaultExpanding)
    }

    this.setState({ expandingDirection })
  },

  render () {
    const expandingDirection = this.state.expandingDirection

    const childrenProps = {
      expanded: this.props.expanded,
      horizontalAlign: expandingDirection.horizontal,
      verticalAlign: expandingDirection.vertical,
      ref: 'expandable',
    }

    return cloneElement(this.props.children, childrenProps)
  },
})

export default PositionedExpander
