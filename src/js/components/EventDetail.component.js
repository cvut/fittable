/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import React from 'react'
import CP from 'counterpart'
import Moment from 'moment'

export default class EventDetail extends React.Component {

  constructor (props) {
    super.constructor(props)
  }

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
    return this.props.linkNames[CP.getLocale() ][type][key] || key
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
          <button className="reveal" onClick={this.revealHidden.bind(this) }>
            <i className="fa fa-exclamation-triangle fa-fw ex-icon"></i>
            <i className="fa fa-caret-down caret"></i> {CP.translate('detail.cancelled') }
          </button>
          <div className="hideable hide">
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
          </div>
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
                                                CP.translate('detail.number', {num: this.props.data.details.parallel }),
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
        <button className="reveal" onClick={this.revealHidden.bind(this) }>
          <i className="fa fa-male"></i><i className="fa fa-caret-down caret"></i> {fullname}
        </button>
        <div className="hideable hide">
          <a href={ 'https://usermap.cvut.cz/profile/' + username}>{CP.translate('detail.usermap_profile') }</a>
          <br />
        <button onClick={this.handleTeacherClick.bind(this, username) }>
          {CP.translate('detail.personal_calendar') }
        </button>
        </div>
      </div>
    )
  }

  revealHidden (e) {

    // Toggle caret icon
    var el = e.target.getElementsByClassName('caret') [0]
    if (el.classList.contains('fa-caret-down')) {
      el.classList.remove('fa-caret-down') ; el.classList.add('fa-caret-up')
    } else {
      el.classList.add('fa-caret-down') ; el.classList.remove('fa-caret-up')
    }

    // Toggle hide class on reveal element
    el = e.target.parentNode.getElementsByClassName('hideable') [0]
    if (el.classList.contains('hide')) {
      el.classList.remove('hide')
    } else {
      el.classList.add('hide')
    }
  }

  /**
   * Renders the component
   */
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
