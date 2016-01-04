/**
 * Indicator showing line representing actual point of today's time
 */

import React, { PropTypes } from 'react'
import moment from 'moment'
import { SMALL_SCREEN, MEDIUM_SCREEN } from '../constants/screenSizes'
import { isScreenMediumAndUp } from '../screen'

function NowIndicator ({currentDate, timeline, viewDate, selectedDay, days7, layout, screenSize}) {
  const now = moment(currentDate)

  // Distance from start of timeline in ms
  const nowPoint = now.diff(now.clone().hour(timeline.startHour).minutes(timeline.startMins))

  const dayWidth = 1 / (days7 ? 7 : 5)
  const length = nowPoint / timeline.length
  const currentWeekday = now.isoWeekday() - 1
  const offset = currentWeekday * dayWidth

  const displayMultipleDays = isScreenMediumAndUp(screenSize)

  let shown = (length > 0 && length < 1 && offset < 1) &&
              now.isSame(viewDate, 'isoWeek')

  if (displayMultipleDays && currentWeekday !== selectedDay) {
    shown = false
  }

  if (!shown) {
    return null
  }

  if (displayMultipleDays && layout === 'horizontal') {
    return (
      <div className="now-indicator-wrap">
        <div className="now-indicator horizontal"
             style={{
               height: (dayWidth * 100) + '%',
               width: (length * 90 + 10) + '%',
               top: (offset * 100) + '%',
             }}
        />
      </div>
    )
  } else {
    return (
      <div className="now-indicator-wrap">
        <div className="now-indicator vertical"
             style={{
               width: (dayWidth * 100) + '%',
               height: (length * 90 + 10) + '%',
               left: (offset * 100) + '%',
             }}
        />
      </div>
    )
  }
}

export default NowIndicator
