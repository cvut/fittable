/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import R from 'ramda'
import { grid as gridPropType } from '../constants/propTypes'

import { weekdayNum, shiftDate, weekStartDate } from '../date'
import { convertSecondsToTime } from '../time'
import { classByScreenSize, isScreenLarge, isScreenSmall } from '../screen'
import {
  createTimeline, calculateEventPosition, calculateHourLabels, classModifiers,
  groupEventsByDays, calculateOverlap, eventAppearance,
} from '../timetable'

import Day from './Day'
import NowIndicator from './NowIndicator'
import ErrorMessage from './ErrorMessage'
import Grid from './Grid'
import EventBox from './Event'
import HourLabel from './HourLabel'

const propTypes = {
  grid: gridPropType,
  viewDate: PropTypes.instanceOf(Date),
  layout: PropTypes.string,
  weekEvents: PropTypes.array, // todo: use events array shape instead
  displayFilter: PropTypes.object,
  functionsOpened: PropTypes.string,
  onViewChange: PropTypes.func,
  onDetailShow: PropTypes.func,
  linkNames: PropTypes.object,
  colored: PropTypes.bool,
  days7: PropTypes.bool,
  onDateChange: PropTypes.func,
  onEventDisplay: PropTypes.func,
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  screenSize: PropTypes.number,
}

function calculateEvents (timeline, events) {
  return R.map((event) => {
    const {position, length} = calculateEventPosition(event, timeline)
    return {
      ...event,
      _position: position,
      _length: length,
      _appear: eventAppearance(event),
    }
  }, events)
}

function createHourLabels (layout, timeline) {
  return R.map(label => (
    <HourLabel key={label.id} position={label.position} length={label.length} layout={layout}>
      {label.label}
    </HourLabel>
  ), calculateHourLabels(timeline))
}

function createDays (props, dayCount, events) {
  const groupedEvents = groupEventsByDays(events)
  const viewDateWeekStart = weekStartDate(props.viewDate)

  return R.times((n) => {
    let dayEvents = ''
    if (n in groupedEvents) {
      dayEvents = createDayEvents(props, groupedEvents[n])
    }

    return (
      <Day id={n}
           key={'day-' + n}
           dayNum={shiftDate(viewDateWeekStart, 'days', n).getDate()}
           viewDate={props.viewDate}>
        {dayEvents}
      </Day>
    )
  }, dayCount)
}

function createDayEvents (props, events) {
  return R.map((event) => {
    if (!props.displayFilter[event.type]) {
      event._appear = 'hide'
    }

    /* fixme: passing too many props to eventbox */
    return (
      <EventBox
        key={event.id}
        data={event}
        detailShown={event.id === props.eventId}
        onClick={props.onDetailShow}
        openFromBottom={event.id >= 3}
        colored={props.colored}
        onViewChange={props.onViewChange}
        onDateChange={props.onDateChange}
        onDetailShow={props.onDetailShow}
        linkNames={props.linkNames}
        layout={props.layout}
        screenSize={props.screenSize}
        />
    )
  }, events)
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

  onClickOutside () {
    if (this.props.eventId) {
      this.showDetailOn(null)
    }
  }

  render () {
    const timeline = createTimeline(this.props.grid)
    const dayCount = (this.props.days7 || isScreenSmall(this.props.screenSize) ? 7 : 5)

    let layout
    let events = this.props.weekEvents

    if (this.props.layout === 'horizontal' && isScreenLarge(this.props.screenSize)) {
      layout = 'horizontal'
    } else {
      layout = 'vertical'
    }

    // Find overlapping events
    events = calculateOverlap(events)

    // Calculate their positions, lengths and appearance
    events = calculateEvents(timeline, events)

    // Create hour labels
    const hourLabels = createHourLabels(layout, timeline)

    // Create days
    const days = createDays(this.props, dayCount, events)

    // Classes by properties
    let className = classModifiers({
      isMuted: this.props.eventId !== null,
      isCut: this.props.functionsOpened !== null && isScreenLarge(this.props.screenSize),
      is7days: this.props.days7,
    }, 'table') // fixme: change class 'table' to 'Timetable'!

    // Classes by screen size
    className += classByScreenSize(this.props.screenSize, [
      ' table--vertical table--small',
      ' table--vertical',
      ' table--' + this.props.layout,
    ])

    // fixme: pass only timeline object, not this bu!@#$it \/
    const timelineStartTime = convertSecondsToTime(timeline.start)
    const timelineHoursFrom = timelineStartTime.h
    const timelineMinutesFrom = timelineStartTime.m
    const timelineLength = timeline.duration / 3600
    const selectedDay = weekdayNum(this.props.viewDate)
    const isGridHorizontal = layout === 'horizontal'
    const timelineHours = timeline.hours
    const timelineOffset = timeline.offset

    return (
      <div className={className} ref="rootEl"
      >
        <div className="grid-overlay" onClick={this.onClickOutside.bind(this)}>
          <div className="grid-wrapper">
            {/* fixme: change props to only layout, timeline and color */}
            <Grid
              horizontal={isGridHorizontal}
              hours={timelineHours}
              offset={timelineOffset}
              color="rgb(210,210,210)"
            />
          </div>
        </div>
        <NowIndicator
          timelineStartHour={ timelineHoursFrom }
          timelineStartMins={ timelineMinutesFrom }
          timelineLength={ timelineLength }
          viewDate={ this.props.viewDate }
          days7={ this.props.days7 }
          layout={ this.props.layout }
          screenSize={ this.props.screenSize }
          selectedDay={ selectedDay }
        />
        <div className="days a-right" ref="days">
          {days}
        </div>
        <div className="clearfix" />
        <div className="hour-labels">
          {hourLabels}
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
