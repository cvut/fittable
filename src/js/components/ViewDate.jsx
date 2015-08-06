/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import Moment from 'moment'
import CP from 'counterpart'
import { moment as momentPropType } from '../types'

const propTypes = {
  viewDate: momentPropType,
  selectedDay: PropTypes.number,
  days7: PropTypes.bool,
}

class ViewDate extends React.Component {

  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  weekRange () {

    const weekStart = new Moment(this.props.viewDate).startOf('isoWeek')
    const weekEnd = new Moment(this.props.viewDate).endOf('isoWeek')

    if (!this.props.days7) {
      weekEnd.subtract(2, 'days')
    }

    if (weekStart.isSame(weekEnd, 'month')) {
      return `${weekStart.date()}. - ${weekEnd.date()}. ${weekStart.format('MMMM')}`
    } else {
      return `${weekStart.format('D. MMMM ')} - ${weekEnd.format('D. MMMM')}`
    }
  }

  render () {
    return <div className="view-date">{this.weekRange()}</div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
