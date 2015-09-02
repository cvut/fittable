/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import Moment from 'moment'
import CP from 'counterpart'
import { moment as momentPropType } from '../constants/propTypes'

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

  weekNum () {
    return this.props.viewDate.format('Wo')
  }

  weekParity () {
    return CP.translate(this.props.viewDate.isoWeek() % 2 === 0 ? 'even' : 'odd')
  }

  render () {
    return <div className="view-date">{CP.translate('weekNav.teachweek', { weeknum: this.weekNum() })} ({this.weekParity()})</div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
