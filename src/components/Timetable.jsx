/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 */

import React, { PropTypes } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import R from 'ramda'
import { grid as gridPropType } from '../constants/propTypes'

import { weekdayNum, shiftDate, weekStartDate, compareDate } from '../date'
import { classByScreenSize, isScreenLarge, isScreenSmall } from '../screen'
import {
  createTimeline, calculateEventPosition, calculateHourLabels, classModifiers,
  groupEventsByDays, calculateOverlap, eventAppearance,
} from '../timetable'
import Day from './Day'
import PeriodicUpdate from './PeriodicUpdate'
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

// Calculate events positions, lengths and appearance.
const calculateEvents = R.curry((timeline, events) => {
  return R.map(event => {
    const {position, length} = calculateEventPosition(event, timeline)
    return {
      ...event,
      _position: position,
      _length: length,
      _appear: eventAppearance(event),
    }
  }, events)
})

function createHourLabels (layout, timeline) {
  return R.map(label => (
    <HourLabel key={label.id} position={label.position} length={label.length} layout={layout}>
      {label.label}
    </HourLabel>
  ), calculateHourLabels(timeline))
}

const createDays = R.curry((props, dayCount, animationDirection, events) => {
  const groupedEvents = groupEventsByDays(events)
  const viewDateWeekStart = weekStartDate(props.viewDate)

  const dayEvents = (n) => {
    if (n in groupedEvents) {
      return createDayEvents(props, animationDirection, groupedEvents[n])
    }
    return null
  }

  return R.times(n => (
    <Day date={shiftDate(viewDateWeekStart, 'days', n)}
         key={'day-' + n}
         viewDate={props.viewDate}>
      {dayEvents(n)}
    </Day>
  ), dayCount)
})

function createDayEvents (props, animationDirection, events) {
  // warn: mutates the given value!
  const hideFilteredEvent = (event) => {
    if (!props.displayFilter[event.type]) {
      event._appear = 'hide'
    }
    return event
  }

  const eventComponents = events.map(event => (
    // FIXME: passing too many props to eventbox
    <EventBox
      key={event.id}
      data={hideFilteredEvent(event)}
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
  ))

  return (
    <CSSTransitionGroup
      transitionName={'anim' + animationDirection}
      transitionAppear
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
      transitionAppearTimeout={250}
    >
      {eventComponents}
    </CSSTransitionGroup>
  )
}

function numberToDirection (number) {
  const directions = ['left', 'none', 'right']
  return directions[number + 1]
}

class Timetable extends React.Component {
  constructor () {
    super()

    this.state = {
      animationDirection: 'none',
    }
  }

  onClickOutside () {
    if (this.props.eventId) {
      this.props.onDetailShow(null)
    }
  }
  componentWillReceiveProps (nextProps) {
    const dateComparison = compareDate(this.props.viewDate, nextProps.viewDate)

    if (dateComparison !== 0) {
      this.setState({
        animationDirection: numberToDirection(dateComparison),
      })
    }
  }

  render () {
    const layout = isScreenLarge(this.props.screenSize) ? this.props.layout : 'vertical'
    const dayCount = (this.props.days7 || isScreenSmall(this.props.screenSize) ? 7 : 5)

    const timeline = createTimeline(this.props.grid)
    const hourLabels = createHourLabels(layout, timeline)

    const days = R.pipe(
      calculateOverlap,
      calculateEvents(timeline),
      createDays(this.props, dayCount, this.state.animationDirection)
    )(this.props.weekEvents)

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

    const isGridHorizontal = layout === 'horizontal'

    return (
      <div className={className} ref="rootEl">
        <div className="grid-overlay" onClick={this.onClickOutside.bind(this)}>
          <div className="grid-wrapper">
            {/* fixme: change props to only layout, timeline and color */}
            <Grid
              horizontal={isGridHorizontal}
              hours={timeline.hours}
              offset={timeline.offset}
              color="rgb(210,210,210)"
            />
          </div>
        </div>
        <PeriodicUpdate period={60000}>
          <NowIndicator
            timeline={ timeline }
            viewDate={ this.props.viewDate }
            days7={ this.props.days7 }
            horizontalLayout={ isGridHorizontal }
            screenSize={ this.props.screenSize }
          />
        </PeriodicUpdate>
        <div className="days" ref="days" key="days">
          {days}
        </div>
        <div className="clearfix" />
        <div className="hour-labels">{hourLabels}</div>
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
