/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { grid as gridPropType } from '../constants/propTypes'
import { SMALL_SCREEN } from '../constants/screenSizes'

import { weekdayNum } from '../date'

import Day from './Day'
import NowIndicator from './NowIndicator'
import ErrorMessage from './ErrorMessage'

const propTypes = {
  grid: gridPropType,
  viewDate: PropTypes.instanceOf(Date),
  layout: PropTypes.string,
  weekEvents: PropTypes.array, // todo: use events array shape instead
  displayFilter: PropTypes.object,
  functionsOpened: PropTypes.string,
  onViewChange: PropTypes.func,
  linkNames: PropTypes.object,
  colored: PropTypes.bool,
  days7: PropTypes.bool,
  onDateChange: PropTypes.func,
  onEventDisplay: PropTypes.func,
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  screenSize: PropTypes.string,
}

class Timetable extends React.Component {

  /**
   * Hides the days element by removing its animation property class
   */
  hide () {
    const el = this.refs.days

    // Replay CSS animation
    el.classList.remove('a-left')
    el.classList.remove('a-right')
  }

  /**
   * Replays the CSS animation of all events from right side to the left.
   */
  animateLeft () {
    const el = this.refs.days

    // Replay CSS animation
    el.classList.remove('a-left')
    el.classList.remove('a-right')
    setTimeout(() => {
      el.classList.add('a-left')
    }, 50)
  }

  /**
   * Replays the CSS animation of all events from left side to the right.
   */
  animateRight () {
    const el = this.refs.days

    // Replay CSS animation
    el.classList.remove('a-left')
    el.classList.remove('a-right')
    setTimeout(() => {
      el.classList.add('a-right')
    }, 50)
  }

  /**
   * Changes the ID of currently displayed EventDetail.
   * @param key EventDetail to display
   */
  showDetailOn (key) {
    this.props.onEventDisplay(key)
  }

  onClickOutside () {
    if (this.props.eventId) {
      this.showDetailOn(null)
    }
  }

  /**
   * Renders the grid
   * @param horizontalLayout Renders the horizontal grid if set to true
   * @param length Grid length
   * @param offset Grid offset
   * @returns {XML}
   */
  getGrid(horizontalLayout = false, length = 0, offset = 0) {

    const gridColor = 'rgba(0,0,0,.1)'

    if (horizontalLayout) {
      return (
        <div className="grid grid--horizontal" style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${gridColor}, ${gridColor} 1px, transparent 1.25px, transparent ${length * 100}%)`,
            left: `${offset * length * 100}%`
            }}>
        </div>
      )
    } else {
      return (
        <div className="grid grid--vertical" style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${gridColor}, ${gridColor} 1px, transparent 1.25px, transparent ${length * 100}%)`,
            top: `${offset * length * -100}%`
            }}>
        </div>
      )
    }
  }

  render () {
    const weekEvents = [ [], [], [], [], [], [], [] ]
    const firstDayStart = moment(this.props.viewDate).startOf('day')
    let minClosestDiff = Infinity
    let closestEvent = null

    // Timeline hours from - to
    const timelineHoursFrom = Math.floor(this.props.grid.starts)
    const timelineHoursTo = Math.floor(this.props.grid.ends)
    const timelineMinutesFrom = Math.floor((this.props.grid.starts - timelineHoursFrom) * 60)
    const timelineMinutesTo = Math.floor((this.props.grid.ends - timelineHoursTo) * 60)

    // Timeline length in milliseconds
    const timelineLength = moment(firstDayStart).hour(timelineHoursTo).minutes(timelineMinutesTo)
      .diff(moment(firstDayStart).hour(timelineHoursFrom).minutes(timelineMinutesFrom))

    // Timeline grid length
    const timelineGridLength = this.props.grid.lessonDuration * 3600000 / timelineLength

    // Make sure the weekEvents data are available...
    if (typeof this.props.weekEvents !== 'undefined' && this.props.weekEvents !== null) {
      for (let event of this.props.weekEvents) {
        const dateStart = moment(event.startsAt)
        const dateEnd = moment(event.endsAt)
        const dayStart = moment(event.startsAt).startOf('day').hour(timelineHoursFrom).minutes(timelineMinutesFrom)

        // Calculate event length and position, relative to timeline
        const eventLength = dateEnd.diff(dateStart)
        event._draw_length = eventLength / timelineLength
        const eventStart = dateStart.diff(dayStart)
        event._draw_position = eventStart / timelineLength

        // Sort events by day of week
        weekEvents[ dateStart.isoWeekday() - 1 ].push(event)

        // Search for closest event from now
        const diffwithnow = dateStart.diff(moment())
        if (diffwithnow < minClosestDiff && diffwithnow > 0 && moment().isSame(dateStart, 'day')) {
          minClosestDiff = diffwithnow
          closestEvent = event
        }
      }
    }

    // Today
    let todayId = -1
    const today = moment()
    if (today.isSame(this.props.viewDate, 'isoWeek')) {
      todayId = today.isoWeekday() - 1
    }

    // Create array of hour labels
    const hourlabels = []
    let idx = 0
    const gridoffset = this.props.grid.facultyGrid ? 0 : this.props.grid.starts % 1
    const gridStartCeil = Math.ceil(this.props.grid.starts)
    const gridEnd = this.props.grid.ends
    const facultyHours = this.props.grid.facultyHours
    for (let i = gridStartCeil; i < (this.props.grid.facultyGrid ? gridStartCeil + facultyHours : gridEnd); i++) {
      const gridLenPercent = `${timelineGridLength * 100}%`
      const offsetLenPercent = `${(idx + gridoffset) * timelineGridLength * 100}%`
      const halfLenOffsetPercent = `${((idx + gridoffset) * timelineGridLength - timelineGridLength/2) * 100}%`

      let style
      if (this.props.layout === 'horizontal') {
        style = {
          width: gridLenPercent,
          left: halfLenOffsetPercent,
        }
      } else {
        style = {
          height: gridLenPercent,
          top: offsetLenPercent,
        }
      }

      hourlabels.push(
        <div
          className="hour-label"
          key={idx}
          style={style}
        >
          {this.props.grid.hoursStartsAt1 ? idx + 1 : i}
        </div>
        )
      idx++
    }

    // Create days
    let days = []
    const selectedDay = weekdayNum(this.props.viewDate)
    for (let i = 0; i < (this.props.days7 ? 7 : 5); i++) {
      days.push(
        <Day
          id={i}
          key={i}
          dayNum={moment(this.props.viewDate).isoWeekday(i + 1).date()}
          events={weekEvents[i]}
          onDetailShow={this.showDetailOn.bind(this)}
          showDetailOn={this.props.eventId}
          displayFilter={this.props.displayFilter}
          onViewChange={this.props.onViewChange}
          linkNames={this.props.linkNames}
          active={todayId == i }
          selected={selectedDay === i}
          colored={this.props.colored}
          onDateChange={this.props.onDateChange}
          layout={this.props.layout}
        />
      )
    }

    const classMuted = (this.props.eventId !== null) ? 'table--muted' : ''
    const classCut = (this.props.functionsOpened !== null) ? 'table--cut' : ''
    const classDays7 = this.props.days7 ? 'table--7days' : ''
    const classLayout = this.props.screenSize == SMALL_SCREEN ? 'table--vertical' : ('table--' + this.props.layout)

    const className = `table ${classLayout} ${classMuted} ${classCut} ${classDays7} table--${this.props.screenSize}`

    const daysClass = this.props.visible ? 'days a-right' : 'days'

    return (
      <div
        className={className}
        ref="rootEl"
      >
        <div className="grid-overlay" onClick={this.onClickOutside.bind(this)}>
          <div className="grid-wrapper">
            {this.getGrid(this.props.layout === 'horizontal', timelineGridLength, gridoffset)}
          </div>
        </div>
        <NowIndicator
          timelineStartHour={ timelineHoursFrom }
          timelineStartMins={ timelineMinutesFrom }
          timelineLength={ timelineLength }
          viewDate={ this.props.viewDate }
          closestEvent={ closestEvent }
        />
        <div
          className={daysClass}
          ref="days"
        >
          {days.map(day => day)}
        </div>
        <div className="clearfix" />
        <div className="hour-labels">
          {hourlabels.map(label => label)}
        </div>
        <ErrorMessage
          visible={this.props.errorVisible}
          type={this.props.error.type}
          onErrorHide={this.props.onErrorHide}
          />
      </div>
    )
  }
}

Timetable.propTypes = propTypes

export default Timetable
