/**
 * Indicator showing line representing actual point of today's time
 */

import React, { PropTypes } from 'react'
import Moment from 'moment'
import { event as eventPropType, moment as momentPropType } from '../types'

const propTypes = {
  timelineStartHour: PropTypes.number,
  timelineStartMins: PropTypes.number,
  timelineLength: PropTypes.number,
  viewDate: momentPropType,
  closestEvent: eventPropType,
}

class NowIndicator extends React.Component {

  render () {

    const nowpoint = new Moment().diff(
      new Moment().hour(this.props.timelineStartHour).minutes(this.props.timelineStartMins)
    )

    const length = nowpoint / this.props.timelineLength

    const shown = this.props.viewDate.isSame(new Moment(), 'isoWeek') && length > 0 && length < 1

    if (this.props.closestEvent !== null) {
      return (
        <div
          className={`now-indicator ${shown ? '' : ' hide'}`}
          ref="rootEl"
          style={{width: (length * 90 + 10) + '%', height: (length * 90 + 10) + '%'}}
        >
          <div className="next">
            {this.props.closestEvent.name} {new Moment(this.props.closestEvent.startsAt).fromNow()}
          </div>
          <i className="fa fa-chevron-circle-right"></i><i className="fa fa-chevron-circle-down"></i>
        </div>
      )
    } else {
      return (
        <div
          className={`now-indicator ${shown ? '' : ' hide'}`}
          ref="rootEl"
          style={{width: (length * 90 + 10) + '%', height: (length * 90 + 10) + '%'}}
        >
          <div className="next"></div>
          <i className="fa fa-chevron-circle-right"></i>
        </div>
      )
    }
  }
}

NowIndicator.propTypes = propTypes

export default NowIndicator
