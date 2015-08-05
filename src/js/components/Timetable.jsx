/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React from 'react'
import Moment from 'moment'

import Day from './Day'
import NowIndicator from './NowIndicator'

export default class Timetable extends React.Component {

  constructor (props) {

    super.constructor(props)

    // FIXME: getInitialState
    this.state = {
      detailShownOn: -1,
      popupsOpened: 0,
    }
  }

  /**
   * Hides the days element by removing its animation property class
   */
  hide () {

    var el = this.refs.days.getDOMNode()

    // Replay CSS animation
    el.classList.remove('a-left')
    el.classList.remove('a-right')
  }

  /**
   * Replays the CSS animation of all events from right side to the left.
   */
  animateLeft () {

    var el = this.refs.days.getDOMNode()

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

    var el = this.refs.days.getDOMNode()

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

    var prevkey = this.state.detailShownOn

    // If it's called on the same event, close all.
    if (key == this.state.detailShownOn) {
      key = -1
    }

    // Calculate num of shown popups
    var popups = this.state.popupsOpened
    if (prevkey == -1 && key != -1) { popups++ }
    if (prevkey != -1 && key == -1) { popups-- }

    this.setState({ detailShownOn: key, popupsOpened: popups })
  }

  render () {

    var weekEvents = [ [], [], [], [], [], [], [] ],
      firstDayStart = new Moment(this.props.viewDate).startOf('day'),
      minClosestDiff = Infinity,
      closestEvent = null

    // Timeline hours from - to
    var timelineHoursFrom = Math.floor(this.props.grid.starts),
      timelineHoursTo = Math.floor(this.props.grid.ends),
      timelineMinutesFrom = Math.floor(( this.props.grid.starts - timelineHoursFrom) * 60),
      timelineMinutesTo = Math.floor(( this.props.grid.ends - timelineHoursTo) * 60)

    // Timeline length in milliseconds
    var timelineLength = new Moment(firstDayStart).hour(timelineHoursTo).minutes(timelineMinutesTo)
      .diff(new Moment(firstDayStart).hour(timelineHoursFrom).minutes(timelineMinutesFrom))

    // Timeline grid length
    var timelineGridLength = this.props.grid.lessonDuration * 3600000 / timelineLength

    // Make sure the weekEvents data are available...
    if (typeof this.props.weekEvents !== 'undefined' && this.props.weekEvents !== null) {
      for (var event of this.props.weekEvents) {
        var dateStart = new Moment(event.startsAt), dateEnd = new Moment(event.endsAt)
        var dayStart = new Moment(event.startsAt).startOf('day')
          .hour(timelineHoursFrom).minutes(timelineMinutesFrom)

        // Calculate event length and position, relative to timeline
        var eventLength = dateEnd.diff(dateStart)
        event._draw_length = eventLength / timelineLength
        var eventStart = dateStart.diff(dayStart)
        event._draw_position = eventStart / timelineLength

        // Sort events by day of week
        weekEvents[ dateStart.isoWeekday() - 1 ].push(event)

        // Search for closest event from now
        var diffwithnow = dateStart.diff(new Moment())
        if (diffwithnow < minClosestDiff && diffwithnow > 0) {
          minClosestDiff = diffwithnow
          closestEvent = event
        }
      }
    }

    // Today
    var todayId = -1
    var today = new Moment()
    if (this.props.viewDate.isSame(today, 'isoWeek')) {
      todayId = today.isoWeekday() - 1
    }

    // Create array of hour labels
    var hourlabels = []
    var idx = 0
    var gridoffset = this.props.grid.facultyGrid ? 0 : this.props.grid.starts % 1
    for (var i = Math.ceil(this.props.grid.starts); i < ( this.props.grid.facultyGrid ? Math.ceil(this.props.grid.starts) + this.props.grid.facultyHours : this.props.grid.ends); i++) {
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
    var days = []
    for ( i = 0; i < 7; i++) {
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

    const className = `table ${this.props.layout} ${classMuted} ${classCut} ${classDays7}`

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
