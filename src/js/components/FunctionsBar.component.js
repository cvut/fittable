/**
 * Component wrapping all function control buttons located in upper right corner of the widget.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';

export default class FunctionsBar extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handles a click on the settings icon
     */
    handleSettingsClick()
    {
        this.props.onPanelToggle( 'settings' );
    }

    /**
     * Handles a click on the search icon
     */
    handleSearchClick()
    {
        this.props.onPanelToggle( 'search' );
    }

    /**
     * Handles a click on the filter icon
     */
    handleFilterClick()
    {
        this.props.onPanelToggle( 'filter' );
    }
    /**
     * Renders the component
     */
    render()
    {
        return <div className="functions-bar">
            <button type="button" className="flags-function">
                <span className="tooltip">{CP.translate( 'functions.flags.name' )}</span>
                <i className="fa fa-flag"></i>
            </button>
            <button type="button" className="filter-function" onClick={this.handleFilterClick.bind(this)}>
                <span className="tooltip">{CP.translate( 'functions.filter.name' )}</span>
                <i className="fa fa-filter"></i>
            </button>
            <button type="button" className="settings-function" onClick={this.handleSettingsClick.bind(this)} onLayoutSelect>
                <span className="tooltip">{CP.translate( 'functions.settings.name' )}</span>
                <i className="fa fa-cog"></i>
            </button>
            <button type="button" className="search-function" onClick={this.handleSearchClick.bind(this)}>
                <span className="tooltip">{CP.translate( 'functions.search.name' )}</span>
                <i className="fa fa-search"></i>
            </button>
        </div>;
    }
}
