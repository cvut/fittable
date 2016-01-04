/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { grid as gridPropType } from '../constants/propTypes'

import { weekdayNum } from '../date'
import { classByScreenSize, isScreenLarge, isScreenSmall } from '../screen'

import Day from './Day'
import PeriodicUpdate from './PeriodicUpdate'
import NowIndicator from './NowIndicator'
import ErrorMessage from './ErrorMessage'
import Grid from './Grid'

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
  screenSize: PropTypes.number,
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

  render () {
    const weekEvents = [ [], [], [], [], [], [], [] ]

    // (ಠ_ಠ) let's refactor this asap, this is not cool, I guess

    // Timeline hours from - to
    const timelineHoursFrom = Math.floor(this.props.grid.starts)
    const timelineHoursTo = Math.floor(this.props.grid.ends)
    const timelineMinutesFrom = Math.floor((this.props.grid.starts - timelineHoursFrom) * 60)
    const timelineMinutesTo = Math.floor((this.props.grid.ends - timelineHoursTo) * 60)

    // Compute timeline properties
    const timelineLength = moment().hour(timelineHoursTo).minutes(timelineMinutesTo)
      .diff(moment().hour(timelineHoursFrom).minutes(timelineMinutesFrom))

    let timelineHourLength, timelineOffset, timelineHours
    if (this.props.grid.facultyGrid) {
      timelineHourLength = this.props.grid.lessonDuration * 3600000 / timelineLength
      timelineHours = timelineLength / this.props.grid.lessonDuration * 3600000
      timelineOffset = 0
    } else {
      timelineHourLength = 3600000 / timelineLength
      timelineHours = timelineLength / 3600000
      timelineOffset = timelineMinutesFrom / 60
    }

    const timeline = {
      startHour: timelineHoursFrom,
      startMins: timelineMinutesFrom,
      length: timelineLength,
    }

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
    for (let i = timelineHoursFrom; i <= timelineHoursTo + 1; i++) {
      // Set hour label proportions
      let style

      const length = timelineHourLength * 100 + '%'
      const position = (timelineHourLength * idx - timelineOffset * timelineHourLength) * 100 + '%'

      if (this.props.layout === 'horizontal' && isScreenLarge(this.props.screenSize)) {
        style = {
          width: length,
          left: position,
        }
      } else {
        style = {
          height: length,
          top: position,
        }
      }

      const label = this.props.grid.facultyGrid ? idx + 1 : i

      hourlabels.push(
        <div className="hour-label" key={i} style={style}>{label}</div>
      )

      idx++
    }

    // Create days
    let days = []
    const selectedDay = weekdayNum(this.props.viewDate)
    const dayCount = (this.props.days7 || isScreenSmall(this.props.screenSize) ? 7 : 5)
    for (let i = 0; i < dayCount; i++) {
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
          screenSize={this.props.screenSize}
        />
      )
    }

    const classMuted = (this.props.eventId !== null) ? 'table--muted' : ''
    const classCut = (this.props.functionsOpened !== null && isScreenLarge(this.props.screenSize)) ? 'table--cut' : ''
    const classDays7 = this.props.days7 ? 'table--7days' : ''
    const classLayout = classByScreenSize(this.props.screenSize, [
      'table--vertical table--small',
      'table--vertical',
      `table--${this.props.layout}`,
    ])

    const className = `table ${classLayout} ${classMuted} ${classCut} ${classDays7}`

    const daysClass = this.props.visible ? 'days a-right' : 'days'
    const isGridHorizontal = !isScreenLarge(this.props.screenSize) ? false : (this.props.layout === 'horizontal')

    return (
      <div
        className={className}
        ref="rootEl"
      >
        <div className="grid-overlay" onClick={this.onClickOutside.bind(this)}>
          <div className="grid-wrapper">
            <Grid
              horizontal={isGridHorizontal}
              hours={timelineHours}
              offset={timelineOffset}
              color="rgb(210,210,210)"
            />
          </div>
        </div>
        <PeriodicUpdate>
          <NowIndicator
            timeline={ timeline }
            viewDate={ this.props.viewDate }
            days7={ this.props.days7 }
            horizontalLayout={isGridHorizontal}
            screenSize={ this.props.screenSize }
            selectedDay={ selectedDay }
          />
        </PeriodicUpdate>
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
