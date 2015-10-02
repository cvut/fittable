/**
 * Component wrapping function panels
 */

import React, { PropTypes } from 'react'

import { options as optionsType } from '../constants/propTypes'
import FunctionSettings from './FunctionSettings'
import FunctionSearch from './FunctionSearch'
import FunctionFilter from './FunctionFilter'

const propTypes = {
  opened: PropTypes.oneOf(['settings', 'search', 'filter']),
  onSettingsChange: PropTypes.func,
  settings: PropTypes.shape(optionsType),
  onSearch: PropTypes.func,
  searchResults: PropTypes.array, // FIXME: shared type
  onViewChange: PropTypes.func,
  displayFilter: PropTypes.objectOf(PropTypes.bool), // FIXME: shared type
  onFilterChange: PropTypes.func,
}

class FunctionsSidebar {

  render () {
    let functionToRender

    if (this.props.opened === 'settings') {
      functionToRender = (
        <FunctionSettings
          ref="functionSettings"
          onSettingChange={this.props.onSettingChange}
          settings={this.props.settings}
        />
      )
    }
    if (this.props.opened === 'search') {
      functionToRender = (
        <FunctionSearch
          ref="functionSearch"
          onSearch={this.props.onSearch}
          searchResults={this.props.searchResults}
          onViewChange={this.props.onViewChange}
        />
      )
    }
    if (this.props.opened === 'filter') {
      functionToRender = (
        <FunctionFilter
          ref="functionFilter"
          displayFilter={this.props.displayFilter}
          onFilterChange={this.props.onFilterChange}
        />
      )
    }

    const className = `functions-sidebar ${this.props.opened !== null ? '' : 'hide'}`

    return (
      <div className={className}>
        <div className="wrap">
          {functionToRender}
        </div>
      </div>
    )
  }
}

FunctionsSidebar.propTypes = propTypes

export default FunctionsSidebar
