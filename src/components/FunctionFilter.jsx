import React from 'react'
import R from 'ramda'
import CP from 'counterpart'

// Types of filterable events.
const eventTypes = [
  'lecture', 'tutorial', 'laboratory', 'exam', 'assessment', 'course_event', 'other',
]

/**
 * Provides ability to filter out some types of events from timetable.
 *
 * @param {Object} options.displayFilter State of the filters.
 * @param {Function} options.onFilterChange Function to be called on a filter change.
 */
function FunctionFilter ({ displayFilter, onFilterChange }) {

  // Handles click on a filter button.
  function handleToggleFilter (filterName) {
    const oldState = displayFilter[filterName]
    onFilterChange({ [filterName]: !oldState })
  }

  const filterButton = (filterName) => (
    <li
      key={ filterName }
      className={ displayFilter[filterName] ? 'active' : '' }
      onClick={ () => handleToggleFilter(filterName) }
    >
      <i className="fa fa-check"></i> { CP.translate('event_type.' + filterName) }
    </li>
  )

  return (
    <div className="function function-filter">
      <div className="clearfix" />
      <h2>{ CP.translate('functions.filter.heading') }</h2>
      <ul className="filtering">
        { R.map(filterButton, eventTypes) }
      </ul>
      <div className="clearfix" />
    </div>
  )
}

export default FunctionFilter
