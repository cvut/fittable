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
   * Handles a click on the search icon
   */
  handleSearchClick () {
    this.props.onPanelToggle('search')

    // Focus the search input
    setTimeout(() => {
      document.getElementById('searchinput').focus()
    }, 1000)
  }

  onFunctionClick (functionName) {
    this.props.onPanelToggle(functionName)
  }

  render () {
    return (
      <div className="functions-bar">
        <button
          type="button"
          className="function-btn ical-function"
          onClick={this.onFunctionClick.bind(this, 'ical')}
        >
          <span className="tooltip">{ CP.translate('functions.ical.name') }</span>
          <i className="fa fa-calendar"></i>
        </button>
        <button
          type="button"
          className="function-btn filter-function"
          onClick={ this.onFunctionClick.bind(this, 'filter') }
        >
          <span className="tooltip">{ CP.translate('functions.filter.name') }</span>
          <i className="fa fa-filter"></i>
        </button>
        <button
          type="button"
          className="function-btn settings-function"
          onClick={ this.onFunctionClick.bind(this, 'settings') }
          onLayoutSelect
        >
          <span className="tooltip">{ CP.translate('functions.settings.name') }</span>
          <i className="fa fa-cog"></i>
        </button>
      </div>

    )
  }
}

FunctionsBar.propTypes = propTypes

export default FunctionsBar
