/**
 * Root component drawing whole widget.
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Moment from 'moment'
import CP from 'counterpart'
import Hammer from 'hammerjs'

import { changeSettings } from '../../actions/settingsActions'

import Controls from '../../components/Controls'
import FunctionsSidebar from '../../components/FunctionsSidebar'

// FIXME: move this to a separate module
function isSmallScreen () {
  return window.innerWidth <= 768
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps (state) {
  return {
    settings: state.settings,
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps (dispatch) {
  return {
    onSettingChange: (key, val) => dispatch(changeSettings({[key]: val})),
  }
}

const FittableContainer = React.createClass({
  getInitialState () {
    return {
      viewDate: new Moment().startOf('isoweek'),
      prevViewDate: new Moment().startOf('isoweek'),
      selectedDay: new Moment().isoWeekday() - 1,
      displayFilter: {
        laboratory: true,
        tutorial: true,
        lecture: true,
        exam: true,
        assessment: true,
        course_event: true,
        other: true,
      },
      // FIXME: this should be loaded dynamically from Sirius!
      grid: {
        starts: 7.5,
        ends: 21.5,
        lessonDuration: 0.875,
      },
      functionOpened: null,
      waiting: true,
      options: this.props,
      searchResults: [],
      error: false,
      errorType: null,
      mutedError: false,
      isMobile: isSmallScreen(),
    }
  },

  // FIXME: too much logic. should be in selector, I guess
  getSemester (viewDate) {
    var semestername
    let year = `${parseInt(viewDate.format('YYYY'), 10) - 1}/${viewDate.format('YY')}`
    if (viewDate.month() < 2) {
      semestername = CP.translate('winter_sem', {year: year})
    } else if (viewDate.month() < 10) {
      semestername = CP.translate('summer_sem', {year: year})
    } else {
      year = `${viewDate.format('YYYY')}/${new Moment(viewDate).add(1, 'year').format('YY')}`
      semestername = CP.translate('winter_sem', {year: year})
    }

    return semestername
  },

  // FIXME: this should totally be in selector
  getWeekEvents (viewDate = null) {
    var newDate = viewDate == null ? this.state.viewDate : viewDate

    var dateFrom = newDate.toISOString()
    var dateTo = new Moment(newDate).endOf('isoweek').toISOString()

    // Try to load data from the cache
    var cacheData = DataCache.lookupCache(dateFrom, dateTo)

    if (cacheData !== null) {
      // Use cache data
      this.setWeekEvents(cacheData, true)
    } else {
      // Require new data
      this.props.callbacks.data(dateFrom, dateTo, this.setWeekEvents)
    }
  },

  // FIXME: this should be deduplicated with selectedDate
  handleChangeViewDate (viewDate) {
    // Update viewDate
    const newdate = new Moment(viewDate)

    // Hide until the request isn't done
    this.refs.timetable.hide()

    // Update the viewDate state
    this.setState({ viewDate: newdate, waiting: true })

    // Send new date through callback
    this.props.callbacks.dateChange(newdate.toISOString(), this.getSemester(newdate))

    // Update the data
    this.getWeekEvents(newdate)
  },

  // FIXME
  handleChangeSelectedDay (by) {
    let selection = this.state.selectedDay + by

    if (selection > 6) {
      selection -= 7
      this.handleChangeViewDate(this.state.viewDate.add(1, 'week'))
    }

    if (selection < 0) {
      selection += 7
      this.handleChangeViewDate(this.state.viewDate.subtract(1, 'week'))
    }

    this.setState({ selectedDay: selection })
  },

  //// Used by FunctionsSidebar
  // FIXME: → mapDispatchToProps
  handleChangeFilter (to) {
    this.setState({ displayFilter: to })
  },

  // FIXME: → mapDispatchToProps
  handleChangeSettingsPanel (to) {
    this.setState({
      functionOpened: (this.state.functionOpened === to ? null : to),
    })
  },

  // FIXME: → mapDispatchToProps
  handleChangeView (to, param) {
    // Close all opened functions
    this.setState({ functionOpened: null })

    this.props.callbacks.viewChange(to, param)
  },

  // FIXME: → mapDispatchToProps
  handleSearch (query) {
    this.setState({ waiting: true })

    this.props.callbacks.search(query, this.receiveSearchResults)
  },

  // FIXME: this should not be needed at all
  handleRefreshNeed () {
    this.setState({})
  },

  render () {

    // FIXME: side effects!!!
    const { locale } = this.props.settings
    CP.setLocale(locale)
    Moment.locale(locale)

    return (
      <div className="fittable-container" ref="rootEl">
        <Controls
          viewDate={this.state.viewDate}
          onWeekChange={this.handleChangeViewDate}
          onDateChange={this.handleChangeViewDate}
          semester={this.getSemester(this.state.viewDate)}
          onSettingsPanelChange={this.handleChangeSettingsPanel}
          days7={this.props.settings.fullWeek}
          onSelDayChange={this.handleChangeSelectedDay}
          selectedDay={this.state.selectedDay}
        />
        <div className="clearfix"></div>
        <FunctionsSidebar
          ref="sidebar"
          opened={this.state.functionOpened}
          displayFilter={this.state.displayFilter}
          onFilterChange={this.handleChangeFilter}
          onSettingChange={this.props.onSettingChange}
          onRefreshNeed={this.handleRefreshNeed}
          settings={this.props.settings}
          onViewChange={this.handleChangeView}
          onSearch={this.handleSearch}
          searchResults={this.state.searchResults}
        />
      </div>
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FittableContainer)
