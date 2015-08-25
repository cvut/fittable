/**
 * Root component drawing whole widget.
 */

import React from 'react'
import Moment from 'moment'
import CP from 'counterpart'
import Hammer from 'hammerjs'

import { options as optionsType } from '../constants/propTypes'
import Controls from './Controls'
import Timetable from './Timetable'
import DataCache from '../DataCache'
import FunctionsSidebar from './FunctionsSidebar'
import Spinner from './Spinner'
import Error from './ErrorMessage'

function isSmallScreen () {
  return window.innerWidth <= 768
}

const propTypes = optionsType

const defaultProps = {
  locale: 'en',
  layout: 'horizontal',
  colors: false,
  days7: false,
  facultygrid: true,
}

class Fittable extends React.Component {
  constructor (props) {

    super(props)

    // Set initial states
    this.state = {
      viewDate: new Moment().startOf('isoweek'),
      prevViewDate: new Moment().startOf('isoweek'),
      layout: 'horizontal',
      selectedDay: new Moment().isoWeekday() - 1,
      displayFilter: {
        'laboratory': true,
        'tutorial': true,
        'lecture': true,
        'exam': true,
        'assessment': true,
        'course_event': true,
        'other': true,
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

    // Declare variables
    this.weekEvents = null
    this.hammer = null
    this.linkNames = {
      cs: { courses: {}, teachers: {}, exceptions: {} },
      en: { courses: {}, teachers: {}, exceptions: {} },
    }
    this.semesters = null
    this.exceptions = {}

    // Force a refresh every one minute
    setInterval(this.handleRefreshNeed.bind(this), 60000)

    // Call for semester data, after finishing, setSemesterData will call for init data
    if ('semesterData' in this.props.callbacks) {
      this.props.callbacks.semesterData(this.setSemesterData.bind(this))
    } else {
      console.error('You forgot to implement the semesterData callback!')
    }

    // Set locale
    CP.setLocale(this.props.locale)
    Moment.locale(this.props.locale)
  }

  /**
   * Calls external data callback, telling that new data should be grabbed from source. If the required data are
   * present in cache, use them instead of calling data callback.
   */
  getWeekEvents (viewDate = null) {
    var newDate = viewDate == null ? this.state.viewDate : viewDate

    var dateFrom = newDate.toISOString()
    var dateTo = new Moment(newDate).endOf('isoweek').toISOString()

    // Try to load data from the cache
    var cacheData = DataCache.lookupCache(dateFrom, dateTo)

    if (cacheData !== null) {
      // Use cache data
      this.setWeekEvents(cacheData, true).bind(this)
    } else {
      // Require new data
      this.props.callbacks.data(dateFrom, dateTo, this.setWeekEvents.bind(this))
    }
  }

  /**
   * Callback saving received data from source / cache to weekEvents variable.
   * If the data are from cache, the second argument should be true.
   * @param {Array} data Data array
   * @param {Array} linksNames Array with full length names for links
   * @param {boolean} alreadyCached The data come from cache and shouldn't be cached again
   */
  setWeekEvents (data, linksNames = null, alreadyCached = false) {
    // Animate in correct direction
    if ('timetable' in this.refs) {
      if (this.state.prevViewDate.isAfter(this.state.viewDate)) {
        this.refs.timetable.animateRight()
      } else {
        this.refs.timetable.animateLeft()
      }
    }

    // Cache data if needed
    if (!alreadyCached) {
      var dateFrom = this.state.viewDate.toISOString()
      var dateTo = new Moment(this.state.viewDate).endOf('isoweek').toISOString()
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
    if (Fittable.areDataValid(data)) {
      this.setState({ weekEvents: data, waiting: false, prevViewDate: this.state.viewDate })
    } else {
      alert('Data invalid!')
      this.setState({ waiting: false, prevViewDate: this.state.viewDate })
    } // todo: alert through UI
  }

  /**
   * Tests if data are valid.
   * @param data Incoming data
   * @returns {boolean} Data are valid
   */
  static areDataValid (data) {

    if (typeof data !== 'undefined' && data !== null) {
      for (var event of data) {
        // Test if dates are valid  (using Moment.js validation)
        if (!new Moment(event.startsAt).isValid()) {
          return false
        }
        if (!new Moment(event.endsAt).isValid()) {
          return false
        }

        // todo: Tests missing!
      }

      // Everything seems correct
      return true
    } else {
      return false
    }
  }

  setSemesterData (semesters) {

    this.semesters = semesters
    // todo: feed the grid settings with data from semester
    // todo: create method for determining the semester name from the data
    this.initialize()
  }

  initialize () {

    // Initial call of dateChange callback
    if ('data' in this.props.callbacks) {
      this.getWeekEvents()
    } else {
      console.error('You forgot to implement the data callback!')
    }

    // Initial call of dateChange callback
    if ('dateChange' in this.props.callbacks) {
      this.props.callbacks.dateChange(this.state.viewDate.toISOString(), this.getSemester(this.state.viewDate))
    }
  }

  search (query) {

    this.setState({ waiting: true })

    if ('search' in this.props.callbacks) {
      this.props.callbacks.search(query, this.receiveSearchResults.bind(this))
    } else {
      alert("Search callback hasn't been defined.")
      // todo: do not alert, show UI error
    }
  }

  refresh () {
    this.getWeekEvents()
  }

  /**
   * Sets error flag and displays error message. The widget will not work anymore, needs reload or calling
   * the muteError method
   * @param errorType Type of error. Default is 'generic'
   */
  onError (errorType) {
    this.setState({
      error: true,
      errorType: errorType,
    })
  }

  /**
   * Mutes displayed error
   */
  muteError () {

    this.setState({
      error: false,
      mutedError: true,
    })
  }

  dismissError () {

    this.setState({
      error: false,
      mutedError: false,
    })
  }

  receiveSearchResults (data) {
    this.setState({ searchResults: data, waiting: false })
  }

  /**
   * Gets actual semester name, determined from actual viewDate state.
   * @returns {string} Semester name
   */
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
  }

  addNewLinkName (key, name, type, locale) {
    this.linkNames[locale][type][key] = name
  }

  isTargetNodeEvent (target) {

    var node = target.parentNode
    while (node != null) {
      if ('classList' in node && node.classList.contains('event')) {
        return true
      }
      node = node.parentNode
    }
    return false
  }

  handleClick (e) {

    // Check if user clicked outside of any event
    if (!this.isTargetNodeEvent(e.target)) {
      // Close all opened events
      this.refs.timetable.showDetailOn(-1)
    }
  }

  /**
   * Changes view date to specified moment. The moment should be the beginning of the week.
   * @param {Moment} viewDate New view date
   */
  handleChangeViewDate (viewDate) {

    // Update viewDate
    var newdate = new Moment(viewDate)

    // Hide until the request isn't done
    this.refs.timetable.hide()

    // Update the viewDate state
    this.setState({ viewDate: newdate, waiting: true })

    // Send new date through callback
    if ('dateChange' in this.props.callbacks) {
      this.props.callbacks.dateChange(newdate.toISOString(), this.getSemester(newdate))
    }

    // Update the data
    this.getWeekEvents(newdate)
  }

  /**
   * Change active selected day relatively by argument. Used for displaying single day on mobile devices.
   * @param {int} by relative change
   */
  handleChangeSelectedDay (by) {

    var selection = this.state.selectedDay + by

    if (selection > 6) {
      selection -= 7
      this.handleChangeViewDate(this.state.viewDate.add(1, 'week'))
    }

    if (selection < 0) {
      selection += 7
      this.handleChangeViewDate(this.state.viewDate.subtract(1, 'week'))
    }

    this.setState({ selectedDay: selection })
  }

  /**
   * Handler for settings changing event.
   * @param {string} key option key
   * @param {string} to new setting
   */
  handleChangeSetting (key, to) {

    var newOptions = this.state.options
    newOptions[key] = to

    // Update viewDate's local locale to global locale
    this.state.viewDate.locale(Moment.locale())

    this.setState({ options: newOptions })

    // Ask for saving the settings through callback
    if ('settingsChange' in this.props.callbacks) {
      this.props.callbacks.settingsChange(newOptions)
    }

    // Force a date update for any date locale updates in
    // the app containing fittable widget
    if ('dateChange' in this.props.callbacks) {
      this.props.callbacks.dateChange(this.state.viewDate.toISOString(), this.getSemester(this.state.viewDate))
    }
  }

  /**
   * Handler for filter changing event.
   * @param {Array} to New filter setting
   */
  handleChangeFilter (to) {

    this.setState({ displayFilter: to })
  }

  /**
   * Opens different / closes settings panel in FunctionsSidebar component.
   * @param to Panel to change
   */
  handleChangeSettingsPanel (to) {
    this.setState({functionOpened: (this.state.functionOpened == to ? null : to) })
  }

  /**
   * Force a refresh by calling setState with no state update
   */
  handleRefreshNeed () {
    this.setState({})
  }

  handleChangeView (to, param) {

    if (typeof this.props.callbacks.viewChange == 'undefined') {
      alert("You haven't set the view changing callback!")
    }

    // Close all opened functions
    this.setState({ functionOpened: null })

    this.props.callbacks.viewChange(to, param)
  }

  /**
   * Hangs a listener on whole fittable element, that listens to swipe touch events.
   * @param el Element to be listened on
   */
  registerSwipeListener (el) {
    this.hammer = new Hammer(el)

    this.hammer.on('swipe', function (e) {
      if (isSmallScreen()) {
        this.handleChangeSelectedDay(e.velocityX > 0 ? 1 : -1)
      }
    }.bind(this))
  }

  /**
   * Cancel all hammer listeners
   */
  unregisterSwipeListener () {
    this.hammer.destroy()
  }

  onWindowResize (e) {
    const mobile = isSmallScreen()
    if (this.state.isMobile !== mobile) {
      this.setState({ isMobile: mobile })
    }
  }

  componentDidMount () {
    this.registerSwipeListener(this.refs.rootEl.getDOMNode())
    this.refs.rootEl.getDOMNode().addEventListener('click', this.handleClick.bind(this))
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  componentWillUnmount () {
    this.unregisterSwipeListener()
    this.refs.rootEl.getDOMNode().removeEventListener('click', this.handleClick.bind(this))
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }

  render () {
    // Grid settings
    var gridsettings = {
      starts: this.state.grid.starts,
      ends: this.state.grid.ends,
      lessonDuration: (!this.state.options.facultygrid ? 1 : this.state.grid.lessonDuration),
      hoursStartsAt1: this.state.options.facultygrid,
      facultyHours: (this.state.grid.ends - this.state.grid.starts) / this.state.grid.lessonDuration,
      facultyGrid: this.state.options.facultygrid,
    }

    if (!this.state.error) {
      return (
        <div className="fittable-container" ref="rootEl">
              <Error
                muted={true}
                shown={this.state.mutedError}
                type={this.state.errorType}
              />
              <Controls
                viewDate={this.state.viewDate}
                onWeekChange={this.handleChangeViewDate.bind(this)}
                onDateChange={this.handleChangeViewDate.bind(this)}
                semester={this.getSemester(this.state.viewDate)}
                onSettingsPanelChange={this.handleChangeSettingsPanel.bind(this)}
                days7={this.state.options.days7}
                onSelDayChange={this.handleChangeSelectedDay.bind(this)}
                selectedDay={this.state.selectedDay}
              />
              <div className="clearfix"></div>
              <FunctionsSidebar
                ref="sidebar"
                opened={this.state.functionOpened}
                displayFilter={this.state.displayFilter}
                onFilterChange={this.handleChangeFilter.bind(this)}
                onSettingChange={this.handleChangeSetting.bind(this)}
                onRefreshNeed={this.handleRefreshNeed.bind(this)}
                options={this.state.options}
                onViewChange={this.handleChangeView.bind(this)}
                onSearch={this.search.bind(this)}
                searchResults={this.state.searchResults}
              />
              <div className="clearfix"></div>
              <Timetable
                grid={gridsettings}
                viewDate={this.state.viewDate}
                layout={this.state.options.layout}
                weekEvents={this.state.weekEvents}
                displayFilter={this.state.displayFilter}
                functionsOpened={this.state.functionOpened}
                selectedDay={this.state.selectedDay}
                onViewChange={this.handleChangeView.bind(this)}
                linkNames={this.linkNames}
                colored={this.state.options.colors}
                days7={this.state.options.days7}
                onDateChange={this.handleChangeViewDate.bind(this)}
                isMobile={this.state.isMobile}
                ref="timetable"
              />
              <Spinner show={this.state.waiting} />
             </div>
        )
    } else {
      return (
        <div className="fittable-container" ref="rootEl">
          <Error type={this.state.errorType} onMute={this.muteError.bind(this)} />
        </div>
      )
    }
  }
}

Fittable.propTypes = propTypes
Fittable.defaultProps = defaultProps

export default Fittable
