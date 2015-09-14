/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'

const propTypes = {
  onViewChange: PropTypes.func,
  showDetailOn: PropTypes.func,
  onDateChange: PropTypes.func,
  linkNames: PropTypes.object, // FIXME: validate shape
  data: PropTypes.object, // FIXME: validate shape
}

const Reveal = React.createClass({
  getInitialState () {
    return {
      open: false,
    }
  },

  onClick () {
    const open = this.state.open
    this.setState({open: !open})
  },

  render () {
    const open = this.state.open
    const {buttonDesc, buttonIconClass} = this.props
    const hideClass = open ? '' : 'hide'
    const caretClass = open ? 'fa-caret-up' : 'fa-caret-down'

    return (
        <div className="reveal-container">
          <button className="reveal" onClick={this.onClick}>
            <i className={`fa ${buttonIconClass}`}></i>
            <i className={`fa caret ${caretClass}`}></i> {buttonDesc}
          </button>
          <div className={`hideable ${hideClass}`}>
            {this.props.children}
          </div>
        </div>
      )
  },
})

class EventDetail extends React.Component {

  handleCourseClick (course) {
    this.props.onViewChange('course', course)
  }

  handleTeacherClick (teacher) {
    this.props.onViewChange('person', teacher)
  }

  handleRoomClick (room) {
    this.props.onViewChange('room', room)
  }

  gotoDate (date) {
    this.props.showDetailOn(-1)
    this.props.onDateChange(new Moment(date))
  }

  getLinkName (type, key) {
    return this.props.linkNames[CP.getLocale()][type][key] || key
  }

  eventBasicProps () {
    const seqNumber = this.props.data.sequenceNumber || '?'
    const name = this.props.data.name || this.getLinkName('courses', this.props.data.course)

    return (
      <div className="prop-section basic-props">
        <div className="type-num">
          {CP.translate(`event_type_num.${this.props.data.type}`, {seqnumber: seqNumber}) }
        </div>
        <div className="name">
          <button onClick={this.handleCourseClick.bind(this, this.props.data.course) }>
            {name}
          </button>
        </div>
        <div className="location">
          <button onClick={this.handleRoomClick.bind(this, this.props.data.room) }>
            <i className="fa fa-map-marker"></i>
            {this.props.data.room}
          </button>
        </div>
      </div>
    )
  }

  eventExceptions () {
    if (this.props.data.details.appliedExceptions && this.props.data.details.appliedExceptions.length > 0) {
      return (
        <div className="prop-section exceptions">
          <Reveal
            buttonDesc={CP.translate('detail.cancelled') }
            buttonIconClass="fa-exclamation-triangle fa-fw ex-icon"
          >
            <div className="because">
              {CP.translate('detail.becauseof') }
            </div>
            {
              this.props.data.details.appliedExceptions.map(function (exception) {
                return (
                  <div>
                    <strong>{this.getLinkName('exceptions', exception) }</strong>
                  </div>
                )
              }.bind(this))
            }
          </Reveal>
        </div>
      )
    }
  }

  eventNumericProps () {
    const studentsCount = this.props.data.details.students ? this.props.data.details.students.length : '?'
    const studentsPropField = this.numPropertyField(CP.translate('detail.students'), studentsCount)

    let capacityPropField = <div />
    if (this.props.data.details.capacity) {
      capacityPropField = this.numPropertyField(CP.translate('detail.capacity'),
                                                this.props.data.details.capacity,
                                                'center')
    }

    let parallelPropField = <div />
    if (this.props.data.details.parallel) {
      parallelPropField = this.numPropertyField(CP.translate('detail.parallel'),
                                                CP.translate('detail.number', {num: this.props.data.details.parallel}),
                                                'right')
    }

    return (
      <div className="prop-section num-props">
       {studentsPropField}
       {capacityPropField}
       {parallelPropField}
      </div>
    )
  }

  eventTeachers () {
    return (
      <div className="prop-section teachers">
        {this.props.data.teachers.map(function (teacher) {
            return this.teacherField(teacher, this.getLinkName('teachers', teacher))
          }.bind(this))
        }
        <div className="prop-title">
          {CP.translate('detail.teachers') }
        </div>
      </div>
    )
  }

  numPropertyField (title, value, align = 'left') {
    return (
      <div className={ 'num-prop ' + align}>
        <div className="value">
          {value}
        </div>
        <div className="prop-title">
          {title}
        </div>
     </div>
    )
  }

  teacherField (username, fullname) {
    return (
      <div className="teacher">
        <Reveal buttonDesc={fullname} buttonIconClass="fa-male">
          <a href={ 'https://usermap.cvut.cz/profile/' + username}>{CP.translate('detail.usermap_profile') }</a>
          <br />
          <button onClick={this.handleTeacherClick.bind(this, username) }>
            {CP.translate('detail.personal_calendar') }
          </button>
        </Reveal>
      </div>
    )
  }

  render () {
    return (
      <div className="detail">
        <div className="wrap">
          {this.eventBasicProps(this)}
          {this.eventExceptions(this)}
          {this.eventNumericProps(this)}
          {this.eventTeachers(this)}
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

EventDetail.propTypes = propTypes

export default EventDetail
