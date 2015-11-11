import { pushState } from 'redux-router'

const ENTITY_TYPE_PLURAL = {
  course: 'courses',
  person: 'people',
  room: 'rooms',
}

function entityType (type) {
  return ENTITY_TYPE_PLURAL[type] || type
}

export function calendarUrl ({id, date, type = null}) {
  const urlType = entityType(type)
  const dateQuery = date ? `?date=${date}` : ''

  return `${urlType}/${id}${dateQuery}`
}

export function changeCalendar (calendar) {
  // XXX: state object is required by history
  //   https://github.com/rackt/history/blob/master/docs/GettingStarted.md#navigation
  return pushState(null, calendarUrl(calendar))
}
