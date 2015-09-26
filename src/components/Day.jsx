/**
 * Component representing one row (day) in timetable.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'

import EventBox from './Event'

function appearanceClass (overlaysLength) {

  if (overlaysLength >= 4) {
    return 'quarter'
  }
  if (overlaysLength === 3) {
    return 'third'
  }
  if (overlaysLength === 2) {
    return 'half'
  }

  return 'regular'
}

/**
 * Applies appearance for array of overlayed events
 * @param events Events array
 * @param overlayed Overlayed events
 * @param appearanceClass Appearance class to be set
 * @returns {*}
 */
function applyAppearance (events, overlayed, appearanceClass) {
  for (var oid in overlayed) {
    events[overlayed[oid]].appear = appearanceClass

    if ((overlayed.length >= 4 && oid % 4 == 0) || (overlayed.length > 1 && oid % overlayed.length == 0)) {
      events[overlayed[oid]].appear += '-first'
    }
  }
  return events
}

const propTypes = {
  id: PropTypes.number.isRequired,
  dayNum: PropTypes.number.isRequired,
  events: PropTypes.array, // FIXME: validate events' shape
  showDetailOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colored: PropTypes.bool,
  linkNames: PropTypes.object, // FIXME: validate shape
  onDetailShow: PropTypes.func,
  onViewChange: PropTypes.func,
  onDateChange: PropTypes.func,
  active: PropTypes.bool,
  selected: PropTypes.bool,
  layout: PropTypes.string,
}

const defaultProps = {
  events: [],
}

class Day extends React.Component {

  /**
   * Compare function - compares by 'startsAs' member variable
   * @param lhs Left hand side
   * @param rhs Right hand side
   * @returns {number} Comparison result
   */
  cmpByStart (lhs, rhs) {

    if (lhs.startsAt < rhs.startsAt) {
      return -1
    } else if (lhs.startsAt > rhs.startsAt) {
      return 1
    } else {
      return 0
    }
  }

  /**
   * Finds all overlayed events and returns updated events array with appear property
   * @param props Props
   * @returns {*} Updated events
   */
  findOverlayedEvents (props) {

    var overlayed = []
    var lastend = new Moment(0)
    var events = props.events.sort(this.cmpByStart)

    // Compares this event's start with the last end. If the start is after the last end,
    // set appropriate appearances for all events in queue.
    for (var evid in events) {

      var start = new Moment(events[evid].startsAt)

      // Compare
      if (start.isAfter(lastend) || start.isSame(lastend)) {
        let appearance = appearanceClass(overlayed.length)
        events = applyAppearance(events, overlayed, appearance)
        overlayed = []
      }

      // Queue the event
      overlayed.push(evid)

      // Set event's end as last end
      if (new Moment(events[evid].endsAt).isAfter(lastend)) {
        lastend = new Moment(events[evid].endsAt)
      }
    }
    // FIXME: DUPLICATION!
    // Set appearance for the last events
    let appearance = appearanceClass(overlayed.length)
    return applyAppearance(events, overlayed, appearance)
  }

  renderEvent (event) {
    if (!this.props.displayFilter[event.type]) {
      event.appear = 'hide'
    }
    const shown = (event.id == this.props.showDetailOn)

    return (
      <EventBox
        key={event.id}
        data={event}
        detailShown={shown}
        onClick={this.props.onDetailShow}
        openFromBottom={this.props.id >= 3}
        colored={this.props.colored}
        onViewChange={this.props.onViewChange}
        onDateChange={this.props.onDateChange}
        linkNames={this.props.linkNames}
        layout={this.props.layout}
      />
    )

  }

  render () {

    const events = this.findOverlayedEvents(this.props)
    const className = `day ${this.props.active ? 'active' : ''} ${this.props.selected ? 'selected' : ''}`
    const weekDay = new Moment().isoWeekday(parseInt(this.props.id, 10) + 1).format('dddd')
    let dayTitle = ''

    if (this.props.active) {
      dayTitle = CP.translate('timetable.actual_day', {day: weekDay})
    }

    return (
      <div className={className} data-day={this.props.id}>
        <div className="label" title={dayTitle}>
          <span className="day-num">{this.props.dayNum}</span>
          <span className="day-name">{weekDay}</span>
        </div>
        <div className="events" ref="events">
          {events.map(this.renderEvent.bind(this))}
        </div>
      </div>
    )
  }
}

Day.propTypes = propTypes
Day.defaultProps = defaultProps

export default Day
