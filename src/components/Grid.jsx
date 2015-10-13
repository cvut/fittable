/**
 * Component for drawing timetable's grid using JS-generated SVG image
 */

import React, { PropTypes } from 'react'

const propTypes = {
  horizontal: PropTypes.bool,
  items: PropTypes.number,
  offset: PropTypes.number,
  color: PropTypes.string,
}

class Grid extends React.Component {

  render () {
    const patternSize = 1 / this.props.items
    const patternOffset = this.props.offset * patternSize

    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <pattern id="Grid" x="0" y={patternOffset} width="100%" height={patternSize}>
            <line x1="0" y1="0" x2="100%" y2="0" stroke={this.props.color} stroke-width="1"   />
          </pattern>
        </defs>
        <rect fill="url(#Grid)" x="0" y="0" width="100%" height="100%" />
      </svg>
    )
  }

}

Grid.propTypes = propTypes

export default Grid
