/**
 * Wraps all controls displayed in the heading of widget.
 * Contains week controllers and functions tools.
 */

import React, { PropTypes } from 'react'
import { isScreenMediumAndUp } from '../screen'

import ViewDate from './ViewDate'
import WeekNav from './WeekNav'
import FunctionsBar from './FunctionsBar'
import WeekSwitcher from './WeekSwitcher'
import { shiftDate, isWeekend } from '../date'
import { semester as semesterType } from '../constants/propTypes'

const propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onSettingsPanelChange: PropTypes.func.isRequired,
  viewDate: React.PropTypes.instanceOf(Date),
  days7: PropTypes.bool,
  semester: semesterType,
}

class Controls extends React.Component {

  /**
   * Handles WeekNav's previous button click event
   */
  handlePrevClick () {
    const shiftFun = shiftDate(this.props.viewDate)
    const skipWeekend = !this.props.days7 && this.props.viewDate.getDay() === 1

    let shiftBy

    if (isScreenMediumAndUp(this.props.screenSize)) {
      shiftBy = shiftFun('week', -1)
    } else {
      shiftBy = shiftFun('day', skipWeekend ? -3 : -1)
    }
    this.props.onDateChange(shiftBy)
  }

  /**
   * Handles WeekNav's next button click event
   */
  handleNextClick () {
    const shiftFun = shiftDate(this.props.viewDate)
    const skipWeekend = !this.props.days7 && this.props.viewDate.getDay() === 5

    let shiftBy

    if (isScreenMediumAndUp(this.props.screenSize)) {
      shiftBy = shiftFun('week', +1)
    } else {
      shiftBy = shiftFun('day', skipWeekend ? +3 : +1)
    }
    this.props.onDateChange(shiftBy)
  }

  /**
   * Handles a click on a week row in the WeekSelector
   */
  handleWeekClick () {
    this.refs.weekSwitcher.toggle()
  }

  render () {

    return (
      <div className="header">
        <WeekNav
          onCalClick={this.handleWeekClick.bind(this)}
          onPrevClick={this.handlePrevClick.bind(this)}
          onNextClick={this.handleNextClick.bind(this)}
          viewDate={this.props.viewDate}
          screenSize={this.props.screenSize}
        />
        <WeekSwitcher
          viewDate={this.props.viewDate}
          ref="weekSwitcher"
          onDateChange={this.props.onDateChange}
          semester={this.props.semester}
        />
        <FunctionsBar onPanelToggle={this.props.onSettingsPanelChange} />
      </div>
    )
  }
}

Controls.propTypes = propTypes

export default Controls
