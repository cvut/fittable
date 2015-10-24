/**
 * Component for drawing timetable's grid using JS-generated SVG image
 */

import React, { PropTypes } from 'react'

const propTypes = {
  horizontal: PropTypes.bool,
  hourLength: PropTypes.number.isRequired,
  timelineOffset: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

const PATTERN_ID = 'Grid-pattern'

class Grid extends React.Component {

  getPattern () {
    const hourOffset = this.props.timelineOffset * this.props.hourLength

    if (this.props.horizontal) {
      return (
        <pattern id={PATTERN_ID} x={hourOffset} y="0" width={this.props.hourLength} height="100%">
          <line x1="0" y1="0" x2="0" y2="100%" stroke={this.props.color} strokeWidth="1" />
        </pattern>
      )
    } else {
      return (
        <pattern id={PATTERN_ID} x="0" y={hourOffset} width="100%" height={this.props.hourLength}>
          <line x1="0" y1="0" x2="100%" y2="0" stroke={this.props.color} strokeWidth="1" />
        </pattern>
      )
    }
  }

  // XXX:You need actually either document's name or a full URL
  //     to resolve the url() reference.
  //     http://stackoverflow.com/q/18259032/240963
  //     Yes, SVG is Magical!
  getPatternUrl () {
    return `${global.location.href}#${PATTERN_ID}`
  }

  render () {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          {this.getPattern()}
        </defs>
        <rect fill={`url(${this.getPatternUrl()})`} x="0" y="0" width="100%" height="100%" />
      </svg>
    )
  }

}

Grid.propTypes = propTypes

export default Grid
