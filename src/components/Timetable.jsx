/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { grid as gridPropType } from '../constants/propTypes'

import { weekdayNum } from '../date'

import Day from './Day'
import NowIndicator from './NowIndicator'

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
  isMobile: PropTypes.bool,
  onEventDisplay: PropTypes.func,
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

  onClickOutside (e) {
    if (this.props.eventId) {
      this.showDetailOn(null)
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
      const style = {
        width: gridLenPercent,
        height: gridLenPercent,
        left: offsetLenPercent,
        top: offsetLenPercent,
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
    for (let i = 0; i < 7; i++) {
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
        />
      )
    }

    const classMuted = (this.props.eventId !== null) ? 'muted' : ''
    const classCut = (this.props.functionsOpened !== null) ? 'cut' : ''
    const classDays7 = this.props.days7 ? 'days7' : ''
    const classMobile = this.props.isMobile ? 'mobile' : ''

    const className = `table ${this.props.layout} ${classMuted} ${classCut} ${classDays7} ${classMobile}`

    const daysClass = this.props.visible ? 'days a-right' : 'days'

    return (
      <div
        className={className}
        ref="rootEl"
      >
        <div className="grid-overlay" onClick={this.onClickOutside.bind(this)}>
          <div className="grid-wrapper">
            <div
              className="grid hor"
              style={{
                backgroundSize: `${timelineGridLength * 100}% 100%`,
                backgroundPosition: `${gridoffset * -100}% 0%`,
              }}
            >
            </div>
            <div
              className="grid ver"
              style={{
                backgroundSize: `100% ${timelineGridLength * 100}%`,
                backgroundPosition: `0% ${gridoffset * -100}%`,
              }}
            >
            </div>
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
      </div>
    )
  }
}

Timetable.propTypes = propTypes

export default Timetable
