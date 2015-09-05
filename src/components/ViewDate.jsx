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

  weekNum () {
    return moment(this.props.viewDate).format('Wo')
  }

  weekParity () {
    const parity = moment(this.props.viewDate).isoWeek() % 2 === 0 ? 'even' : 'odd'
    return CP.translate(parity)
  }

  render () {
    return <div className="view-date">{CP.translate('weekNav.teachweek', { weeknum: this.weekNum() })} ({this.weekParity()})</div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
