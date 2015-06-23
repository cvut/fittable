/**
 * Function component, settings function
 * Main dialog containing all important options to customize look and behaviour of fittable
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';
import Moment from 'moment';

export default class FunctionSettings extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handles setting selection change
     * @param key Setting key
     * @param sel Selected
     */
    handleSettingSelect( key, sel )
    {
        // Delegate to parent
        this.props.onSettingChange( key, sel );
    }

    /**
     * Handles language selection
     * @param sel Selected layout
     */
    handleLanguageSelect( sel )
    {
        this.props.onLanguageChange();

        CP.setLocale( sel );
        Moment.locale( sel );
        this.props.onSettingChange( 'locale', sel );

        // Force refresh
        this.setState( { } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-settings" ref="rootEl">
            <div className="clearfix"></div>
            <div className="row">
                <div className="column medium-6">
                    <h2>{CP.translate( 'functions.settings.layout' )}</h2>
                    <div className="settings-toggle toggleable-h">
                        <button type="button" className={'settings-toggle-btn ' + ( this.props.options.layout == 'horizontal' ? ' active' : '' )} onClick={this.handleSettingSelect.bind( this, 'layout', 'horizontal' )} >
                            <i className="fa fa-fw fa-th-list"></i>
                            {CP.translate( 'functions.settings.layout_horizontal' )}
                        </button>
                        <button type="button" className={'settings-toggle-btn ' + ( this.props.options.layout  == 'vertical' ? ' active' : '' )} onClick={this.handleSettingSelect.bind( this, 'layout', 'vertical' )}>
                            <i className="fa fa-fw fa-th"></i>
                            {CP.translate( 'functions.settings.layout_vertical' )}
                        </button>
                    </div>
                </div>
                <div className="column medium-6">
                    <h2>{CP.translate( 'functions.settings.language' )}</h2>
                    <div className="settings-toggle toggleable-h">
                        <button type="button" className={'settings-toggle-btn ' + ( CP.getLocale() == 'cs' ? ' active' : '' )} onClick={this.handleLanguageSelect.bind( this, 'cs' )} >
                            {CP.translate( 'functions.settings.language_czech' )}
                        </button>
                        <button type="button" className={'settings-toggle-btn ' + ( CP.getLocale() == 'en' ? ' active' : '' )} onClick={this.handleLanguageSelect.bind( this, 'en' )}>
                            {CP.translate( 'functions.settings.language_english' )}
                        </button>
                    </div>
                </div>
            </div>
            <h2>{CP.translate( 'functions.settings.settings' )}</h2>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="setting-colors" type="checkbox" checked={this.props.options.colors} />
                        <label for="setting-colors" onClick={this.handleSettingSelect.bind( this, 'colors', !this.props.options.colors )}></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    {CP.translate( 'functions.settings.settings_colors' )}
                </div>
            </div>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="setting-days7" type="checkbox" checked={this.props.options.days7} />
                        <label for="setting-days7" onClick={this.handleSettingSelect.bind( this, 'days7', !this.props.options.days7 )}></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    {CP.translate( 'functions.settings.settings_7day' )}
                </div>
            </div>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="setting-facultygrid" type="checkbox" checked={this.props.options.facultygrid} />
                        <label for="setting-facultygrid" onClick={this.handleSettingSelect.bind( this, 'facultygrid', ! this.props.options.facultygrid )}></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    {CP.translate( 'functions.settings.settings_facultygrid' )}
                </div>
            </div>
            <h2>{CP.translate( 'functions.settings.about.title' )}</h2>
            <p>
                {CP.translate( 'functions.settings.about.description' )}
            </p>
            <p>
                {CP.translate( 'functions.settings.about.usage' )}
            </p>

        </div>;
    }
}
