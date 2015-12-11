/**
 * Root component drawing whole widget.
 */

import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import CP from 'counterpart'
import { equals } from 'ramda'

import { calendar as calendarSelector } from '../../selectors/routerSelector'
import { changeSettings } from '../../actions/settingsActions'
import { changeDisplayFilters } from '../../actions/filterActions'
import { fetchEvents, hideDataError, updateNow } from '../../actions/dataActions'
import { displaySidebar, displayEvent } from '../../actions/uiActions'
import { fetchSearchResults } from '../../actions/searchActions'
import { fetchSemesterData } from '../../actions/semesterActions'
import { detectScreenSize } from '../../actions/clientActions'
import { fetchUserData } from '../../actions/userActions'
import { changeCalendar } from '../../actions/linkActions'

import { isoDate, strToDate } from '../../date'
import { semesterName } from '../../semester'

import FunctionsSidebar from '../../components/FunctionsSidebar'
import Spinner from '../../components/Spinner'
import Controls from '../../components/Controls'
import Timetable from '../../components/Timetable'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const updatePeriod = 60 // seconds

// Which part of the Redux global state does our component want to receive as props?
// FIXME: since the root component works with the whole global state, we may as well remove this
function mapStateToProps (state) {
  const calendar = calendarSelector(state)

  return {
    settings: state.settings,
    displayFilters: state.displayFilters,
    data: state.data,
    ui: state.ui,
    search: state.search,
    errorVisible: state.data.errorVisible,
    error: {
      type: state.data.error.type,
      message: state.data.error.message,
    },
    semester: state.semester,
    grid: state.semester.grid,
    user: state.user,
    screenSize: state.client.screenSize,
    viewDate: strToDate(calendar.date),
    calendar,
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps (dispatch) {
  return {
    onSettingChange: (key, val) => dispatch(changeSettings({[key]: val})),
    onDisplayFiltersChange: (filters) => dispatch(changeDisplayFilters(filters)),
    onEventsRequest: (callback, date) => dispatch(fetchEvents(callback, date)),
    onSidebarDisplay: (sidebar) => dispatch(displaySidebar(sidebar)),
    onEventDisplay: (eventId) => dispatch(displayEvent(eventId)),
    onSearchRequest: (callback, query) => dispatch(fetchSearchResults(callback, query)),
    // FIXME: bind this one to onViewDateChange too
    onSemesterDataRequest: (callback, date) => dispatch(fetchSemesterData(callback, date)),
    onWindowResize: () => dispatch(detectScreenSize()),
    onErrorHide: () => dispatch(hideDataError()),
    onUserRequest: () => dispatch(fetchUserData()),
    changeCalendar: (calendar) => dispatch(changeCalendar(calendar)),
    updateNow: () => dispatch(updateNow()),
  }
}

function requestSemesterData (props) {
  props.onSemesterDataRequest(props.callbacks.semesterData, props.viewDate)
}

function requestWeekEvents (props) {
  props.onEventsRequest(props.callbacks.data, props.calendar)
}

const FittableContainer = React.createClass({
  componentDidMount () {
    this.props.onWindowResize()
    global.window.addEventListener('resize', this.props.onWindowResize)
    setInterval(this.props.updateNow, updatePeriod * 1000)
  },

  componentWillMount () {
    this.props.onUserRequest()
    requestWeekEvents(this.props)
    requestSemesterData(this.props)
  },

  componentWillUnmount () {
    global.window.removeEventListener('resize', this.props.onWindowResize)
  },

  componentWillReceiveProps (nextProps) {
    if (!equals(nextProps.calendar, this.props.calendar)) {
      requestWeekEvents(nextProps)
      requestSemesterData(nextProps)
    }
  },

  // FIXME: deprecate callback
  handleChangeViewDate (date) {
    // Close all opened functions
    this.props.onSidebarDisplay(null)
    // Also close opened event
    this.props.onEventDisplay(null)

    const calendar = {
      ...this.props.calendar,
      date: isoDate(date),
    }
    this.props.changeCalendar(calendar)
  },

  // FIXME: → mapDispatchToProps
  handleChangeView (type, id) {
    // Close all opened functions
    this.props.onSidebarDisplay(null)
    // Also close opened event
    this.props.onEventDisplay(null)
    const calendar = {
      ...this.props.calendar,
      id,
      type,
    }
    this.props.changeCalendar(calendar)
  },

  handleSearch (query) {
    this.props.onSearchRequest(this.props.callbacks.search, query)
  },

  render () {
    // FIXME: side effects!!!
    const { locale, layout, fullWeek, eventsColors, facultyGrid } = this.props.settings
    CP.setLocale(locale)
    moment.locale(locale)

    const { events, waiting, linkNames } = this.props.data
    const { sidebar, eventId } = this.props.ui

    const error = this.props.error
    const errorVisible = this.props.errorVisible

    // FIXME: this should be done some better way
    const gridsettings = {
      starts: this.props.grid.starts,
      ends: this.props.grid.ends,
      lessonDuration: (!facultyGrid ? 1 : this.props.grid.lessonDuration),
      hoursStartsAt1: facultyGrid,
      facultyHours: (this.props.grid.ends - this.props.grid.starts) / this.props.grid.lessonDuration,
      facultyGrid: facultyGrid,
    }

    return (
      <div className="fittable-container" ref="rootEl">
        <Header
          calendar={this.props.calendar}
          semesterName={semesterName(CP.translate.bind(CP), this.props.semester)}
          userName={this.props.user.name || this.props.user.id}
        />
        {/* FIXME: we don't have the view name data inside fittable :( */}
        <Controls
          viewDate={this.props.viewDate}
          onWeekChange={this.handleChangeViewDate}
          onDateChange={this.handleChangeViewDate}
          semester={this.props.semester}
          onSettingsPanelChange={this.props.onSidebarDisplay}
          days7={fullWeek}
          screenSize={this.props.screenSize}
        />
        <div className="clearfix"></div>
        <FunctionsSidebar
          ref="sidebar"
          opened={sidebar}
          displayFilter={this.props.displayFilters}
          onFilterChange={this.props.onDisplayFiltersChange}
          onSettingChange={this.props.onSettingChange}
          settings={this.props.settings}
          onViewChange={this.handleChangeView}
          onSearch={this.handleSearch}
          searchResults={this.props.search.results}
          user={this.props.user}
        />
        <div className="clearfix"></div>
        <Timetable
          grid={gridsettings}
          viewDate={this.props.viewDate}
          layout={layout}
          weekEvents={events}
          displayFilter={this.props.displayFilters}
          functionsOpened={sidebar}
          onViewChange={this.handleChangeView}
          linkNames={linkNames}
          colored={eventsColors}
          days7={fullWeek}
          onDateChange={this.handleChangeViewDate}
          screenSize={this.props.screenSize}
          ref="timetable"
          visible={!waiting}
          eventId={eventId}
          onEventDisplay={this.props.onEventDisplay}
          error={error}
          errorVisible={errorVisible}
          onErrorHide={this.props.onErrorHide}
          now={this.props.data.now}
        />
        <Footer
          userName={this.props.user.name || this.props.user.id}
          />

        <Spinner show={waiting} />
      </div>
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FittableContainer)
