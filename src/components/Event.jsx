/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'
import { isScreenLarge, isScreenSmall } from '../screen'

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
  showDetail: PropTypes.bool,
}

const defaultProps = {
  showDetail: false,
}

class EventBox extends React.Component {
  style (props) {
    const length = `${props.data._length * 100}%`
    const position = `${props.data._position * 100}%`

    // Vertical layout is forced on small screens
    const layoutCanBeHorizontal = isScreenLarge(props.screenSize)
    const limitMaximumWidth = !isScreenSmall(props.screenSize)
    const isHorizontal = layoutCanBeHorizontal && props.layout === 'horizontal'

    const positionProps = isHorizontal
        ? { width: length, left: position }
        : { height: length, top: position }

    if (limitMaximumWidth && props.showDetail) {
      return {
        ...positionProps,
        maxWidth: EVENT_MAX_WIDTH,
      }
    } else {
      return positionProps
    }
  }

  classNames (props) {
    const cls = ['event', props.data._appear]
    if (props.showDetail) {
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
    const startsAt = new Moment(props.data.startsAt).format('LT')
    const endsAt = new Moment(props.data.endsAt).format('LT')

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
    if (this.props.showDetail) {
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
    const onClickVal = this.props.showDetail ? null : this.props.data.id
    const headSpaceStyle = this.props.showdetail ? {height: EVENT_HEAD_HEIGHT} : {}

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
