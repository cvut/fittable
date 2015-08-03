/**
 * Component representing one row (day) in timetable.
 * @author Marián Hlaváč
 */

import React from 'react'
import CP from 'counterpart'
import Moment from 'moment'

import EventBox from './EventBox.component'

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

  return 'reuglar'
}

export default class Day extends React.Component {

  construtor (props) {
    super.constructor(props)
  }

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

        for (var oid in overlayed) {
          events[overlayed[oid]].appear = appearance
          if (overlayed.length >= 4 && oid % 4 == 0) {
            events[overlayed[oid]].appear += '-m'
          }
        }
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

    for (var oid in overlayed) {
      events[overlayed[oid]].appear = appearance
      if (overlayed.length >= 4 && oid % 4 == 0) {
        events[overlayed[oid]].appear += '-m'
      }
    }

    return events
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
