/**
 * Wraps all controls displayed in the heading of widget.
 * Contains week controllers and functions tools.
 */

import React, { PropTypes } from 'react'
import { moment as momentPropType } from '../constants/propTypes'

import ViewDate from './ViewDate'
import WeekNav from './WeekNav'
import FunctionsBar from './FunctionsBar'
import WeekSwitcher from './WeekSwitcher'

const propTypes = {
  onWeekChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSelDayChange: PropTypes.func.isRequired,
  onSettingsPanelChange: PropTypes.func.isRequired,
  viewDate: momentPropType,
  days7: PropTypes.bool,
  selectedDay: PropTypes.number,
  semester: PropTypes.string,
}

class Controls extends React.Component {

  /**
   * Handles WeekNav's previous button click event
   */
  handlePrevClick () {

    // Different behaviour on different screens. Large up changes weeks, medium down changes active day
    if (window.innerWidth > 768) {
      this.props.onWeekChange(this.props.viewDate.subtract(1, 'week'))
    } else {
      this.props.onSelDayChange(-1)
    }
  }

  /**
   * Handles WeekNav's next button click event
   */
  handleNextClick () {

    // Different behaviour on different screens. Large up changes weeks, medium down changes active day
    if (window.innerWidth > 768) {
      this.props.onWeekChange(this.props.viewDate.add(1, 'week'))
    } else {
      this.props.onSelDayChange(1)
    }
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
          selectedDay={this.props.selectedDay}
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
