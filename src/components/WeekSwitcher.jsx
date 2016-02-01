/**
 * Week switcher is displayed after clicking on Week component. It contains three ways of
 * changing the displayed week. You can move it by one semester, one month or choose
 * exact week from calendar displayed in this dropdown.
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import CP from 'counterpart'

import Toggleable from './Toggleable'
import { semesterName } from '../semester'
import { semester as semesterType } from '../constants/propTypes'

const propTypes = {
  viewDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  semester: semesterType,
}

class WeekSwitcher extends Toggleable {

  /** Returns a Moment factory constructed from this.props.viewDate */
  viewDateMoment () {
    const m = moment(this.props.viewDate)
    return function () {
      return m.clone()
    }
  }

  onDateChange (newDate) {
    return function () {
      this.props.onDateChange(newDate.toDate())
    }.bind(this)
  }

  renderSemesterSelector () {
    const name = semesterName(CP.translate.bind(CP), this.props.semester) ||
                 CP.translate('weekNav.unknown_semester')
    const viewMoment = this.viewDateMoment()

    return (
      <div className="row weeksw-selector weeksw-semester-selector collapse">
        <div className="column small-3 gr-go">
          <button
            type="button"
            className="gr-go-btn"
            onClick={this.onDateChange(viewMoment().subtract(6, 'months'))}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
        </div>
        <div className="column small-6 active-item">
          {name}
        </div>
        <div className="column small-3 gr-go">
          <button
            type="button"
            className="gr-go-btn"
            onClick={this.onDateChange(viewMoment().add(6, 'months'))}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
         </div>
       </div>
    )
  }

  renderMonthSelector () {

    const viewMoment = this.viewDateMoment()

    return (
      <div className="row weeksw-selector weeksw-month-selector collapse">
        <div className="column small-3 gr-go">
          <button
            type="button"
            className="gr-go-btn"
            onClick={this.onDateChange(viewMoment().subtract(1, 'months').startOf('isoWeek'))}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
        </div>
        <div className="column small-6 active-item">
          {viewMoment().format('MMMM')}
        </div>
        <div className="column small-3 gr-go">
          <button
            type="button"
            className="gr-go-btn"
            onClick={this.onDateChange(viewMoment().add(1, 'months').startOf('isoWeek'))}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    )
  }

  render () {

    const viewMoment = this.viewDateMoment()
    const monthEnd = viewMoment().endOf('month').endOf('isoWeek')
    const weeks = [ [], [], [], [], [], [], [] ]
    const moments = [ [], [], [], [], [], [], [] ]
    let lastWeekIndex = 0
    let activeWeekIdx = -1

    // Create weeks of month array
    let weeki = 0
    for (
      const i = viewMoment().startOf('month').startOf('isoWeek');
      i.isBefore(monthEnd);
      i.add(1, 'day')
    ) {
      weeks[weeki].push(i.date())
      if (i.isoWeekday() === 7) {
        moments[weeki] = moment(i).startOf('isoWeek')
        weeki++
      }

      if (i.isSame(this.props.viewDate, 'isoWeek')) {
        activeWeekIdx = weeki
      }
      lastWeekIndex = weeki
    }

    function activeWeekClass (week) {
      if (activeWeekIdx === (weeks.indexOf(week) + 1)) {
        return 'active-week'
      } else {
        return ''
      }
    }

    /**
     * Whether the given day is within the month of beginning of a given week.
     * Returns a class if yes.
     */
    function dayClass (week, day) {

      const weekIndex = weeks.indexOf(week)

      // if the day is in first week AND larger than > 7 OR last week AND smaller than 7
      if ((weekIndex === 0 && day > 7) || ((weekIndex === (lastWeekIndex - 1)) && day < 7)) {
        return 'in-other'
      } else {
        return ''
      }
    }

    function switchWeek (week) {
      const weekIndex = weeks.indexOf(week)
      const weekMoment = moments[weekIndex]
      this.props.onDateChange(weekMoment.toDate())
    }

    // FIXME: (╯°□°)╯︵ ┻━┻
    return (
      <div className="weeksw hide" ref="rootEl">
        {this.renderSemesterSelector()}
        {this.renderMonthSelector()}
        {weeks.map(function (week) {
          return (
            <div
              className={`row weeksw-selector weeksw-week-selector ${activeWeekClass(week)}`}
              key={weeks.indexOf(week)}
            >
              <div className="column small-12">
                {week.map(function (day) {
                  return (
                    <button
                      type="button"
                      className={ 'weeksw-day ' + dayClass(week, day)}
                      onClick={switchWeek.bind(this, week)}
                      key={weeks.indexOf(week) + '-' + day}
                    >
                      {day}
                    </button>
                  )
                }.bind(this))}
              </div>
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
}

WeekSwitcher.propTypes = propTypes

export default WeekSwitcher
