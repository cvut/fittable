/**
 * Component wrapping function panels
 */

import React, { PropTypes } from 'react'

import { options as optionsType } from '../constants/propTypes'
import FunctionSettings from './FunctionSettings'
import FunctionFilter from './FunctionFilter'
import SidebarIcal from './SidebarIcal'

const propTypes = {
  opened: PropTypes.oneOf(['settings', 'search', 'filter', 'ical']),
  onSettingsChange: PropTypes.func,
  settings: PropTypes.shape(optionsType),
  displayFilter: PropTypes.objectOf(PropTypes.bool), // FIXME: shared type
  onFilterChange: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    publicAccessToken: PropTypes.string,
  }),
}

class FunctionsSidebar extends React.Component {

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
    if (this.props.opened === 'filter') {
      functionToRender = (
        <FunctionFilter
          displayFilter={this.props.displayFilter}
          onFilterChange={this.props.onFilterChange}
        />
      )
    }

    if (this.props.opened === 'ical') {
      const {id, publicAccessToken} = this.props.user
      functionToRender = (
        <SidebarIcal username={id} token={publicAccessToken} />
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
