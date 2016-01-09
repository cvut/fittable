/**
 * Indicator showing line representing actual point of today's time
 */

import React from 'react'
import moment from 'moment'
import { isScreenMediumAndUp } from '../screen'
import { weekdayNum } from '../date'

function NowIndicator ({
    currentDate, timeline, viewDate, days7, screenSize, horizontalLayout }) {

  const now = moment(currentDate)

  const startOfToday = now.clone().startOf('day').add(timeline.start, 'seconds')
  // Distance from start of timeline in seconds
  const nowSeconds = now.diff(startOfToday, 'seconds')

  const dayWidth = 1 / (days7 ? 7 : 5)
  const length = nowSeconds / timeline.duration
  const currentWeekday = now.isoWeekday() - 1
  const offset = currentWeekday * dayWidth
  const displayMultipleDays = isScreenMediumAndUp(screenSize)

  const selectedDay = weekdayNum(viewDate)

  // Indicator will be shown if:
  // - it is not bleeding out of the timeline (i.e. length and offset are within some percentage)
  // - we are displaying current week
  let shown = (length > 0 && length < 1 && offset < 1) &&
              now.isSame(viewDate, 'isoWeek')

  if (displayMultipleDays && currentWeekday !== selectedDay) {
    shown = false
  }

  if (!shown) {
    // XXX: stateless components cannot return null or false (for now)
    return <noscript />
  }

  if (displayMultipleDays && horizontalLayout) {
    return (
      <div className="now-indicator-wrap">
        <div className="now-indicator horizontal"
             style={{
               height: (dayWidth * 100) + '%',
               width: (length * 100) + '%',
               top: (offset * 100 + 0.1) + '%', // +0.1% is the grid offset
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
               height: (length * 100) + '%',
               left: (offset * 100 + 0.1) + '%', // +0.1% is the grid offset
             }}
        />
      </div>
    )
  }
}

export default NowIndicator
