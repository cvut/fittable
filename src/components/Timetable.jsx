/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import Moment from 'moment'
import { grid as gridPropType, moment as momentPropType } from '../constants/propTypes'

import Day from './Day'
import NowIndicator from './NowIndicator'

const propTypes = {
  grid: gridPropType,
  viewDate: momentPropType,
  layout: PropTypes.string,
  weekEvents: PropTypes.array, // todo: use events array shape instead
  displayFilter: PropTypes.object,
  functionsOpened: PropTypes.string,
  selectedDay: PropTypes.number,
  onViewChange: PropTypes.func,
  linkNames: PropTypes.object,
  colored: PropTypes.bool,
  days7: PropTypes.bool,
  onDateChange: PropTypes.func,
  isMobile: PropTypes.bool,
}

class Timetable extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      detailShownOn: -1,
      popupsOpened: 0,
    }
  }

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

    const prevkey = this.state.detailShownOn

    // If it's called on the same event, close all.
    if (key === this.state.detailShownOn) {
      key = -1
    }

    // Calculate num of shown popups
    let popups = this.state.popupsOpened
    if (prevkey === -1 && key !== -1) { popups++ }
    if (prevkey !== -1 && key === -1) { popups-- }

    this.setState({ detailShownOn: key, popupsOpened: popups })
  }

  render () {

    const weekEvents = [ [], [], [], [], [], [], [] ]
    const firstDayStart = new Moment(this.props.viewDate).startOf('day')
    let minClosestDiff = Infinity
    let closestEvent = null

    // Timeline hours from - to
    const timelineHoursFrom = Math.floor(this.props.grid.starts)
    const timelineHoursTo = Math.floor(this.props.grid.ends)
    const timelineMinutesFrom = Math.floor(( this.props.grid.starts - timelineHoursFrom) * 60)
    const timelineMinutesTo = Math.floor(( this.props.grid.ends - timelineHoursTo) * 60)

    // Timeline length in milliseconds
    const timelineLength = new Moment(firstDayStart).hour(timelineHoursTo).minutes(timelineMinutesTo)
      .diff(new Moment(firstDayStart).hour(timelineHoursFrom).minutes(timelineMinutesFrom))

    // Timeline grid length
    const timelineGridLength = this.props.grid.lessonDuration * 3600000 / timelineLength

    // Make sure the weekEvents data are available...
    if (typeof this.props.weekEvents !== 'undefined' && this.props.weekEvents !== null) {
      for (let event of this.props.weekEvents) {
        const dateStart = new Moment(event.startsAt)
        const dateEnd = new Moment(event.endsAt)
        const dayStart = new Moment(event.startsAt).startOf('day').hour(timelineHoursFrom).minutes(timelineMinutesFrom)

        // Calculate event length and position, relative to timeline
        const eventLength = dateEnd.diff(dateStart)
        event._draw_length = eventLength / timelineLength
        const eventStart = dateStart.diff(dayStart)
        event._draw_position = eventStart / timelineLength

        // Sort events by day of week
        weekEvents[ dateStart.isoWeekday() - 1 ].push(event)

        // Search for closest event from now
        const diffwithnow = dateStart.diff(new Moment())
        if (diffwithnow < minClosestDiff && diffwithnow > 0 && new Moment().isSame(dateStart, 'day')) {
          minClosestDiff = diffwithnow
          closestEvent = event
        }
      }
    }

    // Today
    let todayId = -1
    const today = new Moment()
    if (this.props.viewDate.isSame(today, 'isoWeek')) {
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
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          id={i}
          key={i}
          dayNum={new Moment(this.props.viewDate).isoWeekday(i + 1).date()}
          events={weekEvents[i]}
          onDetailShow={this.showDetailOn.bind(this)}
          showDetailOn={this.state.detailShownOn}
          displayFilter={this.props.displayFilter}
          onViewChange={this.props.onViewChange}
          linkNames={this.props.linkNames}
          active={todayId == i }
          selected={this.props.selectedDay == i }
          colored={this.props.colored}
          onDateChange={this.props.onDateChange}
        />
      )
    }

    const classMuted = this.state.popupsOpened > 0 ? 'muted' : ''
    const classCut = (this.props.functionsOpened !== null) ? 'cut' : ''
    const classDays7 = this.props.days7 ? 'days7' : ''
    const classMobile = this.props.isMobile ? 'mobile' : ''

    const className = `table ${this.props.layout} ${classMuted} ${classCut} ${classDays7} ${classMobile}`

    return (
      <div
        className={className}
        ref="rootEl"
      >
        <div className="grid-overlay">
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
          className="days a-right"
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
