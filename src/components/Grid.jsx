/**
 * Component for drawing timetable's grid using JS-generated SVG image
 */

import React, { PropTypes } from 'react'
import R from 'ramda'

const propTypes = {
  horizontal: PropTypes.bool,
  hours: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

class Grid extends React.Component {

  createLine (type, hours, offset, color) {
    const defaults = {
      className: 'Grid-line',
      x1: '0',
      y1: '0',
      x2: '100%',
      y2: '100%',
      stroke: color,
      strokeWidth: 1,
    }

    return (n) => {
      const pos = ((n + offset) / hours * 100 + 0.1) + '%'
      // Position percentage +0.1% to avoid cropping the first line

      const inheritedParams = {
        ...defaults,
        key: n,
      }

      if (type === 'vertical') {
        return <line {...inheritedParams} y1={pos} y2={pos} />
      } else {
        return <line {...inheritedParams} x1={pos} x2={pos} />
      }
    }
  }

  getLines () {
    const hours = Math.ceil(this.props.hours)
    const type = this.props.horizontal ? 'horizontal' : 'vertical'

    return R.times(this.createLine(type, this.props.hours, this.props.offset, this.props.color), hours)
  }

  render () {
    return (
      <svg className="Grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        {this.getLines(this)}
      </svg>
    )
  }

}

Grid.propTypes = propTypes

export default Grid
