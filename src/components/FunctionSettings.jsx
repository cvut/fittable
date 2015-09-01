/**
 * Function component, settings function
 * Main dialog containing all important options to customize look and behaviour of fittable
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import { options as optionsType } from '../constants/propTypes'

const propTypes = {
  onSettingChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  settings: PropTypes.shape(optionsType),
}

class FunctionSettings extends React.Component {

  render () {
    const { locale, layout, eventColors, fullWeek, facultyGrid } = this.props.settings
    const handleSettingChange = (k, v) => this.props.onSettingChange.bind(null, k, v)
    return (
      <div
        className="function function-settings"
        ref="rootEl"
      >
        <div className="clearfix" />
        <div className="row">
          <div className="column medium-6">
            <h2>{ CP.translate('functions.settings.layout') }</h2>
            <div className="settings-toggle toggleable-h">
              <button
                type="button"
                className={ 'settings-toggle-btn ' + (layout === 'horizontal' ? ' active' : '') }
                onClick={ handleSettingChange('layout', 'horizontal') }
              >
                <i className="fa fa-fw fa-th-list"></i>
                { CP.translate('functions.settings.layout_horizontal') }
              </button>
              <button
                type="button"
                className={ 'settings-toggle-btn ' + (layout === 'vertical' ? ' active' : '') }
                onClick={ handleSettingChange('layout', 'vertical') }
              >
                <i className="fa fa-fw fa-th"></i>
                { CP.translate('functions.settings.layout_vertical') }
              </button>
            </div>
          </div>
          <div className="column medium-6">
            <h2>{ CP.translate('functions.settings.language') }</h2>
            <div className="settings-toggle toggleable-h">
              <button
                type="button"
                className={ 'settings-toggle-btn ' + (locale === 'cs' ? ' active' : '') }
                onClick={ handleSettingChange('locale', 'cs') }
              >
                { CP.translate('functions.settings.language_czech') }
              </button>
              <button
                type="button"
                className={ 'settings-toggle-btn ' + (locale === 'en' ? ' active' : '') }
                onClick={ handleSettingChange('locale', 'en') }
              >
                { CP.translate('functions.settings.language_english') }
              </button>
            </div>
          </div>
        </div>
        <h2>{ CP.translate('functions.settings.settings') }</h2>
        <div className="row">
          <div className="column small-3">
            <div className="switch small">
              <input
                id="setting-colors"
                type="checkbox"
                checked={ eventColors }
              />
              <label
                htmlFor="setting-colors"
                onClick={ handleSettingChange('eventColors', !eventColors) }
              >
              </label>
            </div>
          </div>
          <div className="column small-9 switch-label">
            { CP.translate('functions.settings.settings_colors') }
          </div>
        </div>
        <div className="row">
          <div className="column small-3">
            <div className="switch small">
              <input
                id="setting-days7"
                type="checkbox"
                checked={ fullWeek }
              />
              <label
                htmlFor="setting-days7"
                onClick={ handleSettingChange('fullWeek', !fullWeek) }
              >
              </label>
            </div>
          </div>
          <div className="column small-9 switch-label">
            { CP.translate('functions.settings.settings_7day') }
          </div>
        </div>
        <div className="row">
          <div className="column small-3">
            <div className="switch small">
              <input
                id="setting-facultygrid"
                type="checkbox"
                checked={ facultyGrid }
              />
              <label
                htmlFor="setting-facultygrid"
                onClick={ handleSettingChange('facultyGrid', !facultyGrid) }
              >
              </label>
            </div>
          </div>
          <div className="column small-9 switch-label">
            { CP.translate('functions.settings.settings_facultygrid') }
          </div>
        </div>
        <h2>{ CP.translate('functions.settings.about.title') }</h2>
        <p>
          { CP.translate('functions.settings.about.description') }
        </p>
        <p>
          { CP.translate('functions.settings.about.usage') }
        </p>
      </div>
    )
  }
}

FunctionSettings.propTypes = propTypes

export default FunctionSettings
