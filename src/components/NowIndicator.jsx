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
  days7: PropTypes.bool,
}

class NowIndicator extends React.Component {

  render () {
    const nowpoint = moment().diff(
      moment().hour(this.props.timelineStartHour).minutes(this.props.timelineStartMins)
    )
    const dayWidth = 1 / (this.props.days7 ? 7 : 5)
    const length = nowpoint / this.props.timelineLength
    const offset = (moment().isoWeekday() - 1) * dayWidth
    const shown = moment().isSame(this.props.viewDate, 'isoWeek') && length > 0 && length < 1 && offset < 1
    return (
      <div className="now-indicator-wrap">
        <div className={`now-indicator horizontal ${shown ? '' : ' hide'}`} ref="rootEl" style={{
          height: (dayWidth * 100) + '%', width: (length * 90 + 10) + '%', top: (offset * 100) + '%'
        }}>
        </div>
        <div className={`now-indicator vertical ${shown ? '' : ' hide'}`} ref="rootEl" style={{
          width: (dayWidth * 100) + '%', height: (length * 90 + 10) + '%', left: (offset * 100) + '%'
        }}>
        </div>
      </div>
    )
  }
}

NowIndicator.propTypes = propTypes

export default NowIndicator
