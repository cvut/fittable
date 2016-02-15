/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import { isScreenSmall } from '../screen'
import { tzMoment } from '../date'

import { EVENT_MAX_WIDTH, EVENT_HEAD_HEIGHT } from '../constants/events'

import EventDetail from './EventDetail'

const propTypes = {
  onViewChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  linkNames: PropTypes.object,
  colored: PropTypes.bool,
  layout: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    course: PropTypes.string,
    appear: PropTypes.string,
    type: PropTypes.string,
  }),
  screenSize: PropTypes.number,
  expanded: PropTypes.bool,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
}

const defaultProps = {
  expanded: false,
}

function getPositionStyle ({layout, horizontalAlign, verticalAlign, data, expanded}) {
  const length = data._length * 100 + '%'
  const position = data._position * 100 + '%'
  let style

  // Set default positioning
  if (layout === 'horizontal') {
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

  // Change alignment if it's different from default alignment
  if (horizontalAlign === 1 && expanded) {
    style = {
      ...style,
      left: 'auto',
      right: '0',
    }
  }
  if (verticalAlign === 1 && expanded) {
    style = {
      ...style,
      top: 'auto',
      bottom: (1 - data._position) * 100 + '%',
      marginBottom: (-EVENT_HEAD_HEIGHT - 17) + 'px', // todo: fix this magic 17px error
    }
  }

  return style
}

class EventBox extends React.Component {

  style (props) {
    const positionStyles = getPositionStyle(props)

    if (props.expanded && !isScreenSmall(props.screenSize)) {
      return {
        ...positionStyles,
        maxWidth: EVENT_MAX_WIDTH,
      }
    } else {
      return positionStyles
    }
  }

  classNames (props) {
    const cls = ['event', props.data._appear]
    if (props.expanded) {
      cls.push('is-opened')
    }
    if (props.data.cancelled) {
      cls.push('event--cancelled')
    }
    if (props.data.replacement) {
      cls.push('event--replacement')
    }

    if (props.colored) {
      cls.push(`event--${props.data.type}`)
    }

    return cls.join(' ')
  }

  displayTime (props) {
    const startsAt = tzMoment(props.data.startsAt).format('LT')
    const endsAt = tzMoment(props.data.endsAt).format('LT')

    return `${startsAt}—${endsAt}`
  }

  displayRoom (props) {
    const roomCode = props.data.room || '?'
    return (
      <div>
        <i className="fa fa-map-marker"></i>
        {roomCode}
      </div>
    )
  }

  eventDetail () {
    if (this.props.expanded) {
      return (
        <EventDetail
         ref="detail"
         data={this.props.data}
         onViewChange={this.props.onViewChange}
         linkNames={this.props.linkNames}
       />
      )
    }
  }

  render () {
    const onClickVal = this.props.expanded ? null : this.props.data.id
    const headSpaceStyle = this.props.expanded ? {height: EVENT_HEAD_HEIGHT} : {}

    return (
      <div
        className={this.classNames(this.props)}
        style={this.style(this.props)}
      >
        <div className="inner">
          <div
            className="head-space"
            onClick={this.props.onClick.bind(null, onClickVal)}
            style={headSpaceStyle}>
            <div className="head-name">
              {this.props.data.course}
            </div>
            <div className="head-time">
              {this.displayTime(this.props)}
            </div>
            <div className="head-room">
              {this.displayRoom(this.props)}
            </div>
            <div className="head-type">
              <span className={`short ${this.props.colored ? ' hide' : ''}`}>
                {CP.translate('event_type_short.' + this.props.data.type)}
              </span>
            </div>
          </div>

          {this.eventDetail()}

          <div className="cancelflag">
            <i className="fa fa-ban"></i>
          </div>
          <div className="replaceflag">
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    )
  }
}

EventBox.propTypes = propTypes
EventBox.defaultProps = defaultProps

export default EventBox
