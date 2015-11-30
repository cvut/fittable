/**
 * Component representing one row (day) in timetable.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import moment from 'moment'

import { weekdayNum } from '../date'

const propTypes = {
  id: PropTypes.number.isRequired,
  dayNum: PropTypes.number.isRequired,
  viewDate: PropTypes.instanceOf(Date),
}

class Day extends React.Component {

  render () {
    const thisDay = moment(this.props.viewDate).isoWeekday(parseInt(this.props.id, 10) + 1)
    const isToday = moment(thisDay).isSame(moment(), 'days')
    const isSelected = moment(thisDay).isSame(moment(this.props.viewDate), 'days')
    const className = `day ${isToday ? 'active' : ''} ${isSelected ? 'selected' : ''}`

    let dayTitle = ''
    if (this.props.active) {
      dayTitle = CP.translate('timetable.actual_day', {day: weekDay})
    }

    return (
      <div className={className} data-day={this.props.id}>
        <div className="label" title={dayTitle}>
          <div className="label-wrap">
            <span className="day-num">{this.props.dayNum}</span>
            <span className="day-name">{thisDay.format('dddd')}</span>
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
