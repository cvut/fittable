/**
 * Indicator showing line representing actual point of today's time
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { event as eventPropType } from '../constants/propTypes'

const propTypes = {
  timelineStartHour: PropTypes.number,
  timelineStartMins: PropTypes.number,
  timelineLength: PropTypes.number,
  viewDate: PropTypes.instanceOf(Date),
  closestEvent: eventPropType,
}

class NowIndicator extends React.Component {

  render () {
    const nowpoint = moment().diff(
      moment().hour(this.props.timelineStartHour).minutes(this.props.timelineStartMins)
    )
    const length = nowpoint / this.props.timelineLength
    return (
      <div className={`now-indicator ${shown ? '' : ' hide'}`} ref="rootEl" style={{width: (length * 90 + 10) + '%', height: (length * 90 + 10) + '%'}}>
      </div>
    )
  }
}

NowIndicator.propTypes = propTypes

export default NowIndicator
