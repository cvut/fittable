/**
 * Indicator showing line representing actual point of today's time
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { event as eventPropType } from '../constants/propTypes'
import { SMALL_SCREEN, MEDIUM_SCREEN } from '../constants/screenSizes'

const propTypes = {
  timelineStartHour: PropTypes.number,
  timelineStartMins: PropTypes.number,
  timelineLength: PropTypes.number,
  viewDate: PropTypes.instanceOf(Date),
  selectedDay: PropTypes.number,
  days7: PropTypes.bool,
  layout: PropTypes.string,
  screenSize: PropTypes.number,
  now: PropTypes.instanceOf(Date),
}

class NowIndicator extends React.Component {

  render () {
    // FIXME: actually use the this.props.now (will do in refactoring phase)
    const nowpoint = moment().diff(
      moment().hour(this.props.timelineStartHour).minutes(this.props.timelineStartMins)
    )
    const dayWidth = 1 / (this.props.days7 ? 7 : 5)
    const length = nowpoint / this.props.timelineLength
    const offset = (moment().isoWeekday() - 1) * dayWidth
    let shown = moment().isSame(this.props.viewDate, 'isoWeek') && length > 0 && length < 1 && offset < 1

    // If we are on a mobile, hide the indicator when the current day isn't today.
    if (this.props.screenSize <= MEDIUM_SCREEN && moment().isoWeekday() - 1 !== this.props.selectedDay) {
      shown = false
    }

    if (this.props.screenSize <= MEDIUM_SCREEN ? false : this.props.layout === 'horizontal') {
      return (
        <div className="now-indicator-wrap">
          <div className={`now-indicator horizontal ${shown ? '' : ' hide'}`} ref="rootEl" style={{
          height: (dayWidth * 100) + '%', width: (length * 90 + 10) + '%', top: (offset * 100) + '%'
        }}>
          </div>
        </div>
      )
    } else {
      return (
        <div className="now-indicator-wrap">
          <div className={`now-indicator vertical ${shown ? '' : ' hide'}`} ref="rootEl" style={{
          width: (dayWidth * 100) + '%', height: (length * 90 + 10) + '%', left: (offset * 100) + '%'
        }}>
          </div>
        </div>
      )
    }
  }
}

NowIndicator.propTypes = propTypes

export default NowIndicator
