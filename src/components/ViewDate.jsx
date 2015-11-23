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
    const weekParity = this.weekParity(this.props.weekParity)
    const weekText = CP.translate('weekNav.week_' + this.props.weekType, { weeknum: this.props.weekNum, parity: weekParity })
    const translationExists = ['teaching', 'exams', 'holiday'].indexOf(this.props.weekType) >= 0
    const week = (this.props.weekNum && translationExists) ? weekText : ''

    return <div className="view-date">
      {week}
    </div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
