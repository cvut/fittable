/**
 * Component wrapping all function control buttons located in upper right corner of the widget.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  onPanelToggle: PropTypes.func,
}

class FunctionsBar extends React.Component {

  /**
   * Handles a click on the settings icon
   */
  handleSettingsClick () {
    this.props.onPanelToggle('settings')
  }

  /**
   * Handles a click on the search icon
   */
  handleSearchClick () {

    this.props.onPanelToggle('search')

    // Focus the search input
    setTimeout(() => {
      document.getElementById('searchinput').focus()
    }, 1000)
  }

  /**
   * Handles a click on the filter icon
   */
  handleFilterClick () {
    this.props.onPanelToggle('filter')
  }

  render () {

    return (
      <div className="functions-bar">
        <button
          type="button"
          className="function-btn flags-function"
        >
          <span className="tooltip">{ CP.translate('functions.flags.name') }</span>
          <i className="fa fa-flag"></i>
        </button>
        <button
          type="button"
          className="function-btn filter-function"
          onClick={ this.handleFilterClick.bind(this) }
        >
          <span className="tooltip">{ CP.translate('functions.filter.name') }</span>
          <i className="fa fa-filter"></i>
        </button>
        <button
          type="button"
          className="function-btn settings-function"
          onClick={ this.handleSettingsClick.bind(this) }
          onLayoutSelect
        >
          <span className="tooltip">{ CP.translate('functions.settings.name') }</span>
          <i className="fa fa-cog"></i>
        </button>
        <button
          type="button"
          className="function-btn search-function"
          onClick={ this.handleSearchClick.bind(this) }
        >
          <span className="tooltip">{ CP.translate('functions.search.name') }</span>
          <i className="fa fa-search"></i>
        </button>
      </div>

    )
  }
}

FunctionsBar.propTypes = propTypes

export default FunctionsBar
