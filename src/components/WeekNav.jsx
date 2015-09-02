/**
 * Week navigator components consists of two buttons, one for navigation to the left and second for navigation to the
 * right.
 */

import React, { PropTypes } from 'react'
import Moment from 'moment'
import CP from 'counterpart'
import { moment as momentPropType } from '../constants/propTypes'

const propTypes = {
  onCalClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  viewDate: momentPropType,
  selectedDay: PropTypes.number,
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
    const weekStart = new Moment(this.props.viewDate).startOf('isoWeek')
    const weekEnd = new Moment(this.props.viewDate).endOf('isoWeek')

    if (!this.props.days7) {
      weekEnd.subtract(2, 'days')
    }

    if (Moment.locale() == "cs")
    {
      return `${weekStart.format('D. M. ')} - ${weekEnd.format('D. M. YYYY')}`
    }
    else
    {
      return `${weekStart.format('M/D')} - ${weekEnd.format('M/D/YYYY')}`
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
