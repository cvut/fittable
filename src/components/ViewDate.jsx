/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import CP from 'counterpart'
import { weekRange, workWeekRange } from '../date'

const propTypes = {
  viewDate: PropTypes.instanceOf(Date),
}

class ViewDate extends React.Component {

  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  weekParity (weekParity) {
    if (weekParity !== 'even' && weekParity !== 'odd') {
      return '-'
    }

    return CP.translate(weekParity)
  }

  render () {
    return <div className="view-date">
      {CP.translate('weekNav.teachweek', { weeknum: this.props.weekNum })} ({this.weekParity(this.props.weekParity)})
    </div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
