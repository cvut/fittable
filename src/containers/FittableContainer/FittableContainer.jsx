/**
 * Root component drawing whole widget.
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import CP from 'counterpart'

import { changeSettings } from '../../actions/settingsActions'
import { changeViewDate } from '../../actions/dateActions'
import * as date from '../../date'

import DataCache from '../../DataCache'
import FunctionsSidebar from '../../components/FunctionsSidebar'
import Spinner from '../../components/Spinner'
import Controls from '../../components/Controls'
import Timetable from '../../components/Timetable'
import ErrorMessage from '../../components/ErrorMessage'

// FIXME: move this to a separate module
function isSmallScreen () {
  return window.innerWidth <= 768
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps (state) {
  return {
    settings: state.settings,
    viewDate: state.viewDate,
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps (dispatch) {
  return {
    onSettingChange: (key, val) => dispatch(changeSettings({[key]: val})),
    onViewDateChange: (newDate) => dispatch(changeViewDate(newDate)),
  }
}

const FittableContainer = React.createClass({
  getInitialState () {
    return {
      prevViewDate: moment().startOf('isoweek'),
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
      linkNames: {
        cs: { courses: {}, teachers: {}, exceptions: {} },
        en: { courses: {}, teachers: {}, exceptions: {} },
      },
    }
  },

  // FIXME: too much logic. should be in selector, I guess
  getSemester (viewDate) {
    viewDate = moment(viewDate)
    let semestername
    let year = `${parseInt(viewDate.format('YYYY'), 10) - 1}/${viewDate.format('YY')}`
    if (viewDate.month() < 2) {
      semestername = CP.translate('winter_sem', {year: year})
    } else if (viewDate.month() < 10) {
      semestername = CP.translate('summer_sem', {year: year})
    } else {
      year = `${viewDate.format('YYYY')}/${moment(viewDate).add(1, 'year').format('YY')}`
      semestername = CP.translate('winter_sem', {year: year})
    }

    return semestername
  },

  // FIXME: this should totally be in selector
  getWeekEvents (viewDate = null) {
    const newDate = viewDate || this.props.viewDate

    const [dateFrom, dateTo] = date.isoWeekRange(newDate)

    // Try to load data from the cache
    const cacheData = DataCache.lookupCache(dateFrom, dateTo)

    if (cacheData) {
      // Use cache data
      this.setWeekEvents(cacheData, true)
    } else {
      // Require new data
      this.props.callbacks.data(dateFrom, dateTo, this.setWeekEvents)
    }
  },

  setWeekEvents (data, linksNames = null, alreadyCached = false) {
    // Animate in correct direction
    /*if ('timetable' in this.refs) {
      if (this.state.prevViewDate.isAfter(this.state.viewDate)) {
        this.refs.timetable.animateRight()
      } else {
        this.refs.timetable.animateLeft()
      }
    }*/
    this.refs.timetable.animateRight()

    // Cache data if needed
    if (!alreadyCached) {
      const [dateFrom, dateTo] = date.isoWeekRange(this.props.viewDate)
      DataCache.cacheData(dateFrom, dateTo, data)
    }

    // Save teachers link names
    if ('teachers' in linksNames) {
      for (var tlinkname of linksNames.teachers) {
        this.addNewLinkName(tlinkname.id, tlinkname.name.cs, 'teachers', 'cs')
        this.addNewLinkName(tlinkname.id, tlinkname.name.en, 'teachers', 'en')
      }
    }

    // Save courses link names
    if ('courses' in linksNames) {
      for (var clinkname of linksNames.courses) {
        this.addNewLinkName(clinkname.id, clinkname.name.cs, 'courses', 'cs')
        this.addNewLinkName(clinkname.id, clinkname.name.en, 'courses', 'en')
      }
    }

    // Save exceptions link names
    if ('exceptions' in linksNames) {
      for (var clinkname of linksNames.exceptions) {
        this.addNewLinkName(clinkname.id, clinkname.name, 'exceptions', 'cs')
        this.addNewLinkName(clinkname.id, clinkname.name, 'exceptions', 'en')
      }
    }

    // Set the data into state
    this.setState({ weekEvents: data, waiting: false, prevViewDate: this.state.viewDate })
  },

  // FIXME: this should be deduplicated with selectedDate
  handleChangeViewDate (viewDate) {
    // Update the viewDate state
    this.props.onViewDateChange(viewDate)

    // Hide until the request isn't done
    this.refs.timetable.hide()

    // Update viewDate
    const newdate = moment(viewDate)
    // Send new date through callback
    this.props.callbacks.dateChange(newdate.toISOString(), this.getSemester(newdate))

    // Update the data
    this.getWeekEvents(newdate)
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

  // FIXME: what the hell is even this?
  addNewLinkName (key, name, type, locale) {
    const linkNames = {...this.state.linkNames}
    linkNames[locale][type][key] = name
    this.setState({linkNames})
  },

  render () {

    // FIXME: side effects!!!
    const { locale, layout, fullWeek, eventsColors, facultyGrid } = this.props.settings
    CP.setLocale(locale)
    moment.locale(locale)

    // FIXME: this should be calculated by selector
    const gridsettings = {
      starts: this.state.grid.starts,
      ends: this.state.grid.ends,
      lessonDuration: (!facultyGrid ? 1 : this.state.grid.lessonDuration),
      hoursStartsAt1: facultyGrid,
      facultyHours: (this.state.grid.ends - this.state.grid.starts) / this.state.grid.lessonDuration,
      facultyGrid: facultyGrid,
    }

    return (
      <div className="fittable-container" ref="rootEl">
        <ErrorMessage
          muted={true}
          shown={this.state.mutedError}
          type={this.state.errorType}
        />
        <Controls
          viewDate={this.props.viewDate}
          onWeekChange={this.handleChangeViewDate}
          onDateChange={this.handleChangeViewDate}
          semester={this.getSemester(this.props.viewDate)}
          onSettingsPanelChange={this.handleChangeSettingsPanel}
          days7={fullWeek}
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
        <div className="clearfix"></div>
        <Timetable
          grid={gridsettings}
          viewDate={this.props.viewDate}
          layout={layout}
          weekEvents={this.state.weekEvents}
          displayFilter={this.state.displayFilter}
          functionsOpened={this.state.functionOpened}
          onViewChange={this.handleChangeView}
          linkNames={this.state.linkNames}
          colored={eventsColors}
          days7={fullWeek}
          onDateChange={this.handleChangeViewDate}
          isMobile={this.state.isMobile}
          ref="timetable"
        />
        <Spinner show={this.state.waiting} />
      </div>
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FittableContainer)
