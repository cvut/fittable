/**
 * Component representing one row (day) in timetable.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import moment from 'moment'

const propTypes = {
  date: PropTypes.instanceOf(moment),
  viewDate: PropTypes.instanceOf(Date),
}

class Day extends React.Component {

  render () {
    const date = this.props.date
    const isToday = date.isSame(moment(), 'days')
    const isSelected = date.isSame(this.props.viewDate, 'days')
    const className = `day ${isToday ? 'active' : ''} ${isSelected ? 'selected' : ''}`

    let dayTitle = ''
    if (this.props.active) {
      dayTitle = CP.translate('timetable.actual_day', {day: weekDay})
    }

    return (
      <div className={className}>
        <div className="label" title={dayTitle}>
          <div className="label-wrap">
            <span className="day-num">{date.getDate()}</span>
            <span className="day-name">{date.format('dddd')}</span>
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
