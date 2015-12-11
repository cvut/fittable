/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import R from 'ramda'
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
    const translationExists = R.contains(this.props.weekType, ['teaching', 'exams', 'holiday'])

    let weekText
    if (translationExists) {
      weekText = CP.translate('weekNav.week_' + this.props.weekType, { weeknum: this.props.weekNum, parity: weekParity })
    } else {
      weekText = ''
    }

    return <div className="view-date">
      {weekText}
    </div>
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
