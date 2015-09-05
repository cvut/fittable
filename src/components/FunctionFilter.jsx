/**
 * Function component, filtering function
 * Provides ability to filter out some types of events from timetable
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  displayFilter: PropTypes.objectOf(PropTypes.bool),
  onFilterChange: PropTypes.func,
}

class FunctionFilter extends React.Component {

  /**
   * Handles clicking on one filter item
   * @param {string} filter Clicked filter item
   */
  handleToggleFilter (filter) {
    const oldState = this.props.displayFilter[filter]
    this.props.onFilterChange({[filter]: !oldState})
  }

  render () {

    return (
      <div className="function function-filter" ref="rootEl">
        <div className="clearfix" />
        <h2>{CP.translate('functions.filter.heading')}</h2>
        <ul className="filtering">
          <li
            className={ this.props.displayFilter['lecture'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'lecture')}
          >
            <i className="fa fa-check"></i> {CP.translate('event_type.lecture')}
          </li>
          <li
            className={ this.props.displayFilter['tutorial'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'tutorial')}
          >
            <i className="fa fa-check"></i> {CP.translate('event_type.tutorial')}
          </li>
          <li
            className={ this.props.displayFilter['laboratory'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'laboratory')}
          >
            <i className="fa fa-check"></i> {CP.translate('event_type.laboratory')}
          </li>
          <li
            className={ this.props.displayFilter['exam'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'exam')}
          >
            <i className="fa fa-check"></i> {CP.translate('event_type.exam')}
          </li>
          <li
            className={ this.props.displayFilter['assessment'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'assessment')}
          >
           <i className="fa fa-check"></i> {CP.translate('event_type.assessment')}
          </li>
          <li
            className={ this.props.displayFilter['course_event'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'course_event')}
          >
           <i className="fa fa-check"></i> {CP.translate('event_type.course_event')}
          </li>
          <li
            className={ this.props.displayFilter['other'] ? 'active' : '' }
            onClick={this.handleToggleFilter.bind(this, 'other')}
          >
            <i className="fa fa-check"></i> {CP.translate('event_type.other')}
          </li>
        </ul>
        <div className="clearfix" />
        </div>
    )
  }
}

FunctionFilter.propTypes = propTypes

export default FunctionFilter
