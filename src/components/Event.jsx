/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'
import { isScreenLarge, isScreenSmall } from '../screen'

import { EVENT_MAX_WIDTH, EVENT_MAX_HEIGHT, EVENT_HEAD_HEIGHT } from '../constants/events'

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

    let positionProperties
    if (props.layout === 'horizontal' && isScreenLarge(this.props.screenSize)) {
      positionProperties = {
        width: length,
        left: position,
      }
    } else {
      positionProperties = {
        height: length,
        top: position,
      }
    }

    if (props.showDetail && !isScreenSmall(props.screenSize)) {
      return {
        ...positionProperties,
        maxWidth: EVENT_MAX_WIDTH,
      }
    } else {
      return positionProperties
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
    return (
      <div>
        <i className="fa fa-map-marker"></i>
        {props.data.room}
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

    return (
      <div
        className={this.classNames(this.props)}
        style={this.style(this.props)}
      >
        <div className="inner">
          <div
            className="head-space"
            onClick={this.props.onClick.bind(null, onClickVal)}
            style={{height: EVENT_HEAD_HEIGHT}}>
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
