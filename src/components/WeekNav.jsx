/**
 * Week navigator components consists of two buttons, one for navigation to the left and second for navigation to the
 * right.
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import CP from 'counterpart'
import { weekRange, workWeekRange } from '../date'
import { isScreenMediumAndUp } from '../screen'

const propTypes = {
  onCalClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  viewDate: PropTypes.instanceOf(Date),
}

class WeekNav extends React.Component {
  /**
   * Handler for events, when the calendar button is clicked ( bubbles to parent )
   * @param e event
   */
  handleCalClick (e) {
    this.props.onCalClick(e)
  }
  /**
   * Handler for events, when the previous button is clicked ( bubbles to parent )
   * @param e event
   */
  handlePrevClick (e) {
    this.props.onPrevClick(e)
  }

  /**
   * Handler for events, when the next button is clicked ( bubbles to parent )
   * @param e
   */
  handleNextClick (e) {
    this.props.onNextClick(e)
  }

  viewDate () {
    const rangeFun = this.props.days7 ? weekRange : workWeekRange

    // FIXME: remove moment dependency
    const [weekStart, weekEnd] = rangeFun(this.props.viewDate).map(d => moment(d))
    const currDayM = moment(this.props.viewDate)

    const rangeIsWeek = isScreenMediumAndUp(this.props.screenSize)

    if (rangeIsWeek) {
      if (moment.locale() === 'cs') {
        // u2013 : &ndash; \u2009 : &thinsp;
        return `${weekStart.format('D.\u2009M. ')} \u2013 ${weekEnd.format('D.\u2009M.\u2009YYYY')}`
      } else {
        return `${weekStart.format('M/D')} \u2013 ${weekEnd.format('M/D/YYYY')}`
      }
    } else {
      return `${currDayM.format('dddd D.\u2009MMMM')}`
    }
  }

  render () {

    return (
      <div className="week-nav">
        <button
          type="button"
          className="week-nav-btn week-nav-prev"
          onClick={this.handlePrevClick.bind(this)}
          title={CP.translate('weekNav.prev')}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <button
          type="button"
          className="week-nav-btn week-nav-calendar"
          onClick={this.handleCalClick.bind(this)}
          title={CP.translate('weekNav.selector')}
        >
          <strong className="week-toggle-num">{this.viewDate()}</strong>
        </button>
        <button
          type="button"
          className="week-nav-btn week-nav-next"
          onClick={this.handleNextClick.bind(this)}
          title={CP.translate('weekNav.next')}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    )
  }
}

WeekNav.propTypes = propTypes

export default WeekNav
