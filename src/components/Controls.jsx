/**
 * Wraps all controls displayed in the heading of widget.
 * Contains week controllers and functions tools.
 */

import React, { PropTypes } from 'react'
import { SMALL_SCREEN } from '../constants/screenSizes'

import ViewDate from './ViewDate'
import WeekNav from './WeekNav'
import FunctionsBar from './FunctionsBar'
import WeekSwitcher from './WeekSwitcher'
import { shiftDate } from '../date'

const propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onSettingsPanelChange: PropTypes.func.isRequired,
  viewDate: React.PropTypes.instanceOf(Date),
  days7: PropTypes.bool,
  semester: PropTypes.string,
}

class Controls extends React.Component {

  /**
   * Handles WeekNav's previous button click event
   */
  handlePrevClick () {
    const shiftFun = shiftDate(this.props.viewDate)
    let shiftBy

    if (this.props.screenSize == SMALL_SCREEN) {
      shiftBy = shiftFun('day', -1)
    } else {
      shiftBy = shiftFun('week', -1)
    }
    this.props.onDateChange(shiftBy)
  }

  /**
   * Handles WeekNav's next button click event
   */
  handleNextClick () {
    const shiftFun = shiftDate(this.props.viewDate)
    let shiftBy

    if (this.props.screenSize == SMALL_SCREEN) {
      shiftBy = shiftFun('day', +1)
    } else {
      shiftBy = shiftFun('week', +1)
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
