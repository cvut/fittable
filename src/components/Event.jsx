/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'
import { isScreenLarge } from '../screen'

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
  detailShown: false,
}

class EventBox extends React.Component {
  style (props) {
    const length = `${props.data._length * 100}%`
    const position = `${props.data._position * 100}%`

    if (this.props.layout === 'horizontal' && isScreenLarge(this.props.screenSize)) {
      return {
        width: length,
        left: position,
      }
    } else {
      return {
        height: length,
        top: position,
      }
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

  render () {
    const onClickVal = this.props.detailShown ? null : this.props.data.id

    return (
      <div
        className={this.classNames(this.props)}
        style={this.style(this.props)}
      >
        <div className="inner">
          <div
            className="head-space"
            onClick={this.props.onClick.bind(null, onClickVal)}>
          </div>
          <div className="name">
            {this.props.data.course}
          </div>
          <div className="time">
            {this.displayTime(this.props)}
          </div>
          <div className="room">
            {this.displayRoom(this.props)}
          </div>
          <div className="type">
            <span className={`short ${this.props.colored ? ' hide' : ''}`}>
              {CP.translate('event_type_short.' + this.props.data.type)}
            </span>
          </div>
          <EventDetail
             ref="detail"
             data={this.props.data}
             onViewChange={this.props.onViewChange}
             linkNames={this.props.linkNames}
          />
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
