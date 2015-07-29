/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 * @author Marián Hlaváč
 */

import React from 'react'
import Moment from 'moment'
import CP from 'counterpart'

export default class ViewDate extends React.Component {
  constructor (props) {

    super.constructor(props)

    this.state = {
      open: false,
    }
  }

  weekRange () {

    var weekStart = new Moment(this.props.viewDate).startOf('isoWeek')
    var weekEnd = new Moment(this.props.viewDate).endOf('isoWeek')

    if (!this.props.days7) {
      weekEnd.subtract(2, 'days')
    }

    if (weekStart.isSame(weekEnd, 'month')) {
      return `${weekStart.date()}. - ${weekEnd.date()}. ${weekStart.format('MMMM')}`
    } else {
      return `${weekStart.format('D. MMMM ')} - ${weekEnd.format('D. MMMM')}`
    }
  }

  /**
   * Renders the component
   */
  render() {

    return <div className="view-date">
             {this.weekRange()}
           </div>
  }
}
