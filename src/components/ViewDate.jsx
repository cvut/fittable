/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

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
    const weekText = CP.translate('weekNav.week_' + this.props.weekType,
      {
        weeknum: this.props.weekNum,
        parity: this.weekParity(this.props.weekParity),
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
