/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

import { weekProperties } from '../semester'

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

    const { weekParity, weekNum, weekType } = weekProperties(this.props.viewDate, this.props.semester)

    const weekText = CP.translate('weekNav.week_' + weekType,
      {
        weeknum: weekNum,
        parity: this.weekParity(weekParity),
        fallback: ' ',
      })

    return (
      <div className="view-date">
        {weekText}
      </div>
    )
  }
}

ViewDate.propTypes = propTypes

export default ViewDate
