/**
 * Component representing one row (day) in timetable.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'

const propTypes = {
  id: PropTypes.number.isRequired,
  dayNum: PropTypes.number.isRequired,
  active: PropTypes.bool,
  selected: PropTypes.bool,
}

class Day extends React.Component {

  render () {
    const className = `day ${this.props.active ? 'active' : ''} ${this.props.selected ? 'selected' : ''}`
    const weekDay = new Moment().isoWeekday(parseInt(this.props.id, 10) + 1).format('dddd')

    let dayTitle = ''
    if (this.props.active) {
      dayTitle = CP.translate('timetable.actual_day', {day: weekDay})
    }

    return (
      <div className={className} data-day={this.props.id}>
        <div className="label" title={dayTitle}>
          <div className="label-wrap">
            <span className="day-num">{this.props.dayNum}</span>
            <span className="day-name">{weekDay}</span>
          </div>
        </div>
        <div className="events" ref="events">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Day.propTypes = propTypes

export default Day
