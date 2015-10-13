/**
 * Component for drawing timetable's grid using JS-generated SVG image
 */

import React, { PropTypes } from 'react'

const propTypes = {
  horizontal: PropTypes.bool,
  hours: PropTypes.number,
  offset: PropTypes.number,
  color: PropTypes.string,
}

class Grid extends React.Component {

  getPattern() {

    const patternSize = 1 / this.props.hours
    const patternOffset = this.props.offset * patternSize

    if (this.props.horizontal) {
      return (
        <pattern id="Grid" x={patternOffset} y="0" width={patternSize} height="100%">
          <line x1="0" y1="0" x2="0" y2="100%" stroke={this.props.color} stroke-width="1" />
        </pattern>
      )
    } else {
      return (
        <pattern id="Grid" x="0" y={patternOffset} width="100%" height={patternSize}>
          <line x1="0" y1="0" x2="100%" y2="0" stroke={this.props.color} stroke-width="1" />
        </pattern>
      )
    }

  }

  render () {

    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          {this.getPattern()}
        </defs>
        <rect fill="url(#Grid)" x="0" y="0" width="100%" height="100%" />
      </svg>
    )
  }

}

Grid.propTypes = propTypes

export default Grid
