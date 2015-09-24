/**
 * Fittable application
 *
 * This is the main javascript file for fittable app.
 * Implements callbacks using Sirius API as data source. Then initializes the fittable widget.
 *
 * @author      Marián Hlaváč
 * @version     1.0
 */

import Grapnel from 'grapnel'
import ReactCookie from 'react-cookie'
import URL from 'url'
import R from 'ramda'

const emptyObject = (obj) => R.is(Object, obj) && R.pipe(R.keys, R.propEq('length', 0))

/**
 * Fittable widget instance
 */
var f

/**
 * Main application parameter, specifying the view
 * Choices are: person, room, course
 * @type {string}
 */
var view = 'person'

/**
 * Parameter for the selected view. Used for specifying the room or course.
 * @type {string}
 */
var parameter = ''

/**
 * Logged user's credentials
 * @type {{name: string, token: string}}
 */
var user = {
  name: ReactCookie.load('oauth_nickname'),
  token: ReactCookie.load('oauth_access_token'),
}

/**
 * Actual Sirius API URL
 * @type {string}
 */
var siriusAPIUrl = 'https://sirius.fit.cvut.cz/staging/api/v1/'

/**
 * Currently selected application language setting
 * @type {string}
 */
var appLocale = 'cs'

/**
 * Localized view names
 */
var viewNames = {
  cs: {
    person: 'osoba',
    room: 'místnost',
    course: 'předmět',
    personal: 'osobní rozvrh',
  },
  en: {
    person: 'person',
    room: 'room',
    course: 'course',
    personal: 'personal timetable',
  },
}

var viewPaths = {
  course: 'courses',
  person: 'people',
  room: 'rooms',
}

var defaultLimit = 32

var STATUS_ERROR_TYPES = {
  0: 'connection',
  403: 'access',
  404: 'not-found',
  500: 'server-error',
}
function generateError (status, message = 'No message specified') {
  const error = new Error(message)
  if (status in STATUS_ERROR_TYPES) {
    error.type = STATUS_ERROR_TYPES[status]
  } else {
    error.type = 'generic'
  }
  return error
}

/**
 * @return {Grapnel} an initialized router.
 */
function initRouter () {

  var router = new Grapnel({
    root: getBaseUri(),
    hashBang: true,
    pushState: mayUsePushState()
  })

  var handleView = function (viewName) {
    return (req) => changeView(viewName, req.params.id)
  }

  router.get('/?', req => changeView('person', user.name))
  router.get('/courses/:id', handleView('course'))
  router.get('/people/:id', handleView('person'))
  router.get('/rooms/:id', handleView('room'))

  // Default route, redirect all unmatched to /.
  router.get('/*', (req, e) => {
    if (!e.parent()) {
      router.navigate('/')
    }
  })

  return router
}

/**
 * @return {string} a base URI (aka relative URL root) of this site with
 * trailing slash omitted.
 */
function getBaseUri () {
  return URL.parse(document.baseURI).pathname.replace(/\/$/, '')
}

/**
 * @return {boolean} should we enable pushState?
 */
function mayUsePushState () {
  return window.location.protocol !== 'file:'
}

/**
 * Updates the title on the top
 * @param {string} title Large title
 * @param {string} subtitle Small subtitle under title
 */
function updateTitle (title, subtitle = null)
{
  if ( title !== null ) document.getElementsByTagName('h1')[0].innerHTML = title
  if ( subtitle !== null ) document.getElementsByClassName('sub-header')[0].innerHTML = subtitle
}

function changeView (newView, newParam) {
  // Set new view
  view = newView
  parameter = newParam

  // Change title
  updateTitle(view === 'person' && parameter === user.name ?
    viewNames[appLocale]['personal'] : viewNames[appLocale][view] + ' ' + parameter, null)
}

/**
 * Checks the user variable, if it's valid logged user.
 * @returns {bool}
 */
function isUserLoggedIn () {
  return (user.name && user.token)
}

function setUsername (username) {
  document.getElementById('username').innerHTML = username
}

function makeRequest (parameters) {

  var requestUrl = siriusAPIUrl

  requestUrl += parameters

  var request = new XMLHttpRequest()
  request.open('GET', encodeURI(requestUrl), true)
  request.setRequestHeader('Authorization', 'Bearer ' + user.token)
  request.send(null)

  return request
}

/**
 * Data callback, requesting the events from Sirius API, depending on view type and range.
 * @param rangeFrom Start point of the range
 * @param rangeTo Ending point of the range
 * @param callback Callback to be called after successful request
 */
var dataCallback = function (rangeFrom, rangeTo, callback) {

  // Make the request
  var request = makeRequest(viewPaths[view] + '/' + parameter + '/events?from=' + rangeFrom +
    '&to=' + rangeTo + '&limit=' + defaultLimit + '&include=courses,teachers,schedule_exceptions&deleted=true')

  request.onreadystatechange = function (callback, fittable) {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        // Request successful
        var ajaxresult = JSON.parse(request.responseText)
        var itemCount = ajaxresult.meta.count

        var linknames = { teachers: [], courses: [], exceptions: [] }

        const responseEvents = ajaxresult.events || []
        const data = responseEvents.map(event => {
          // And add new event to array
          const newEvent = {
            id: event.id,
            name: event.name,
            course: event.links.course,
            startsAt: event.starts_at,
            endsAt: event.ends_at,
            sequenceNumber: event.sequence_number,
            type: event.event_type,
            room: event.links.room,
            flag: null,
            notification: false,
            cancelled: event.deleted,
            replacement: false,
            teachers: event.links.teachers,
            details: {
              students: event.links.students,
              capacity: event.capacity,
              parallel: event.parallel,
              appliedExceptions: event.links.applied_exceptions,
            },
          }

          // If the original data are present, insert one reverted event
          if (!emptyObject(event.original_data)) {
            // Convert times to milliseconds
            var rangeFromMs = (new Date(rangeFrom)).getMilliseconds()
            var rangeToMs = (new Date(rangeTo)).getMilliseconds()
            var originalFromMs = (new Date(event.original_data.starts_at)).getMilliseconds()

            // Check if the original start is between the range
            if (rangeFromMs <= originalFromMs && originalFromMs >= rangeToMs) {
              // The event is cancelled, show with original data
              newEvent.startsAt = event.original_data.starts_at
              newEvent.endsAt = event.original_data.ends_at
              newEvent.room = event.original_data.room_id
              newEvent.cancelled = true
              newEvent.replacedAt = event.starts_at
            } else {
              // The event is replacement
              newEvent.replacement = true
              newEvent.replaces = event.original_data.starts_at
            }
          }
          return newEvent
        })

        // Add teachers links full names
        if ('linked' in ajaxresult) {
          if ('teachers' in ajaxresult.linked) {
            for (let i = 0; i < ajaxresult.linked.teachers.length; i++) {
              // Add teacher link full name
              linknames.teachers.push({
                id: ajaxresult.linked.teachers[i].id,
                name: {
                  cs: ajaxresult.linked.teachers[i].full_name,
                  en: ajaxresult.linked.teachers[i].full_name,
                },
              })
            }
          }

          // Add courses links full names
          if ('courses' in ajaxresult.linked) {
            for (let i = 0; i < ajaxresult.linked.courses.length; i++) {
              // Add course link full name
              linknames.courses.push({
                id: ajaxresult.linked.courses[i].id,
                name: {
                  cs: ajaxresult.linked.courses[i].name.cs,
                  en: ajaxresult.linked.courses[i].name.en,
                },
              })
            }
          }

          // Add exceptions links full names
          if ('schedule_exceptions' in ajaxresult.linked) {
            for (let i = 0; i < ajaxresult.linked.schedule_exceptions.length; i++) {
              // Add exceptions link full name
              linknames.exceptions.push({
                id: ajaxresult.linked.schedule_exceptions[i].id,
                type: ajaxresult.linked.schedule_exceptions[i].exception_type,
                name: ajaxresult.linked.schedule_exceptions[i].name
              })
            }
          }
        }

        // Send data to fittable
        callback(null, {events: data, linkNames: linknames})
      } else {
        // Request failed
        callback(generateError(request.status, 'dataCallback failed'))
      }
    }
  }.bind(null, callback, f)
}

/**
 * Search callback, returning search results from Sirius API.
 * @param query
 * @param callback
 */
var searchCallback = function (query, callback) {

  // Construct the request URL
  var request = makeRequest('search?q=' + query + '&limit=' + defaultLimit)

  request.onreadystatechange = function (callback, fittable) {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        // Request successful
        var ajaxresult = JSON.parse(request.responseText)

        // Send data to fittable
        callback(ajaxresult.results)
      } else {
        // Request failed
        fittable.onError(generateError(request.status).type)
      }
    }
  }.bind(null, callback, f)
}

var dateChangeCallback = function (newdate, newsemester) {
  console.log(newdate, newsemester)
  // Display semester name in subheading
  updateTitle(null, newsemester)
}

var semesterDataCallback = function (callback) {

  // Construct the request URL
  var request = makeRequest('semesters?limit=' + defaultLimit)

  request.onreadystatechange = function (callback, fittable) {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        // Request successful
        var ajaxresult = JSON.parse(request.responseText)
        var itemCount = ajaxresult.meta.count

        // Check if there is semesters object in result
        if (!('semesters' in ajaxresult)) {
          return false
        }

        var semesters = []

        // Create events from data
        for (var i = 0; i < itemCount; i++) {
          var semester = ajaxresult.semesters[i]

          // And add new semester to array
          semesters[ i ] = {
            id: semester.id,
            semester: semester.semester,
            faculty: semester.faculty,
            startsAt: semester.starts_at,
            endsAt: semester.ends_at,
            examsStartsAt: semester.exams_start_at,
            examsEndsAt: semester.exams_end_at,
            hourDuration: semester.hour_duration,
            breakDuration: 15,
            dayStartsAtHour: 7.5,
            dayEndsAtHour: 21.25
          }
        }

        // Send semester data to fittable
        callback(semesters)
      } else {
        // Request failed
        fittable.onError(generateError(request.status).type)
      }
    }
  }.bind(null, callback, f)
}

var settingsChangeCallback = function (settings) {

  // We really don't want to save the user property
  settings.user = null

  // Save settings
  window.localStorage.setItem(user.name + '.settings', JSON.stringify(settings))

  // Update appLocale
  appLocale = settings.locale

  // Update title and subtitle for possible locale change
  updateTitle(view === 'person' && parameter === user.name ?
    viewNames[appLocale]['personal'] : viewNames[appLocale][view] + ' ' + parameter, null)
}

/**
 * --- Initialize the widget ---
 */

document.addEventListener('DOMContentLoaded', function () {


})

function viewChangeCallback (view, param) {
  router.navigate(`/${viewPaths[view]}/${param}`)
}

// If the user is not logged in, redirect him to the landing page
if (!isUserLoggedIn()) {
  window.location.href = 'landing.html'
} else {
  var router = initRouter()

  setUsername(user.name)

  // Prepare the options object with default values
  var options = {
    locale: 'cs',
  }

  // Load settings from localStorage
  var save = window.localStorage.getItem(user.name + '.settings')
  if (save !== null) {
    var usersettings = JSON.parse(save)

    for (var key in usersettings) {
      options[key] = usersettings[key]
    }
  }

  // Set user and callbacks
  options.username = user.name
  options.usertoken = user.token
  options.callbacks = {
    data: dataCallback,
    search: searchCallback,

    dateChange: dateChangeCallback,
    semesterData: semesterDataCallback,
    settingsChange: settingsChangeCallback
  }

  // Get app locale
  appLocale = options.locale

  // Init set title
  updateTitle(view === 'person' && parameter === user.name ?
    viewNames[appLocale]['personal'] : viewNames[appLocale][view] + ' ' + parameter, null)
}

export {
  dataCallback as data,
  searchCallback as search,
  dateChangeCallback as dateChange,
  semesterDataCallback as semesterData,
  settingsChangeCallback as settingsChange,
  viewChangeCallback as viewChange,
}
