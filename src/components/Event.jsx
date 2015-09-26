/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'
import { SMALL_SCREEN, MEDIUM_SCREEN } from '../constants/screenSizes'

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
}

const defaultProps = {
  detailShown: false,
}

class EventBox extends React.Component {

  style (props) {

    var length = `${props.data._draw_length * 100}%`
    var position = `${props.data._draw_position * 100}%`

    if (this.props.layout === 'horizontal' && this.props.screenSize > MEDIUM_SCREEN) {
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

    const cls = ['event', props.data.appear]
    if (props.detailShown) {
      cls.push('is-opened')
    }
    if (props.data.cancelled) {
      cls.push('event--cancelled')
    }
    if (props.openFromBottom) {
      cls.push('event--frombottom')
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

    var startsAt = new Moment(this.props.data.startsAt).format('LT')
    var endsAt = new Moment(this.props.data.endsAt).format('LT')

    if (props.detailShown) {
      return `${startsAt}—${endsAt}`
    } else {
      return `${startsAt}`
    }
  }

  render () {
    const {appear, id} = this.props.data
    const onClickVal = this.props.detailShown ? null : id

    return (
      <div
        className={this.classNames(this.props)}
        data-event={id}
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
