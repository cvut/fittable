import React from 'react'
import R from 'ramda'
import { findWeekByDate } from '../semesterWeeks'
import { translate } from '../locale'

// @sig Week -> String -> String
const translateWeekName = R.curry((week, type) => {
  return translate(`semesterWeek.${type}`, {
    weekNum: week.teachingWeek || '?',
    parity: translate(week.parity, { fallback: '' }),
  })
})

// @sig Week -> String
const displayName = (week) => {
  if (!week) { return '' }
  return R.map(translateWeekName(week), week.types).join(' / ')
}

/**
 * Displays properties of the specified semester week (period type, teching
 * week number and parity).
 */
const SemesterWeek = ({ semester, viewDate }) => {
  const week = findWeekByDate(semester.weeks || [], viewDate)

  return (
    <div className="SemesterWeek-text">
      {displayName(week)}
    </div>
  )
}

export default SemesterWeek
