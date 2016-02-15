import { createClass, PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import R from 'ramda'
import safeExpandingDirection from '../utils/safeExpandingDirection'

import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT } from '../constants/events'
import { WrongChildren } from '../exceptions'

function getExpandingDirection (ref, defaultDir) {
  const expandableDOM = findDOMNode(ref)

  let position = [0, 0]
  if (expandableDOM) {
    position = R.props(['left', 'top'], expandableDOM.getBoundingClientRect())
  }

  return safeExpandingDirection(
    position,
    [EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT],
    global,
    defaultDir)
}

const PositionedExpander = createClass({
  propTypes: {
    expanded: PropTypes.bool,
    left: PropTypes.number,
    top: PropTypes.number,
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
    if (this.refs && this.refs.expandable && expanded) {
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

    if (this.props.children !== 1) {
      return cloneElement(this.props.children, childrenProps)
    } else {
      throw new WrongChildren('PositionedExpander component requires one children.')
    }
  },
})

export default PositionedExpander
