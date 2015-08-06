import { PropTypes } from 'react'
import Moment from 'moment'

export const event = PropTypes.shape({
  id: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  name: PropTypes.string,
  course: PropTypes.string,
  startsAt: PropTypes.string, // FIXME: regexp for ISO string
  endsAt: PropTypes.string,
  sequenceNumber: PropTypes.number,
  type: PropTypes.string,
  room: PropTypes.string,
  // flag: PropTypes.string,
  notification: PropTypes.bool,
  cancelled: PropTypes.bool,
  replacement: PropTypes.bool,
  teachers: PropTypes.arrayOf(PropTypes.string),
  details: PropTypes.shape({
    description: PropTypes.string,
    students: PropTypes.array, // FIXME: shape for student
    capacity: PropTypes.number,
    parallel: PropTypes.string,
    appliedExceptions: PropTypes.array, // FIXME: shape for exceptions
  }),
})

export const options = Object.freeze({
  callbacks: PropTypes.shape({
    search: PropTypes.func,
    data: PropTypes.func.isRequired,
    semesterData: PropTypes.func.isRequired,
    dateChange: PropTypes.func.isRequired,
  }),
  locale: PropTypes.oneOf(['cs', 'en']),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  colors: PropTypes.bool,
  days7: PropTypes.bool,
  facultygrid: PropTypes.bool,
})

export const grid = PropTypes.shape({
  starts: PropTypes.number,
  ends: PropTypes.number,
  lessonDuration: PropTypes.number,
  hoursStartsAt1: PropTypes.bool,
  facultyHours: PropTypes.number,
  facultyGrid: PropTypes.bool,
})

export const moment = (props, propName, componentName) => {
  const prop = props[propName]
  if (!Moment.isMoment(prop)) {
    return new Error(`Expected ${propName} to be an instance of Moment. Got ${typeof prop}.`)
  }
}
