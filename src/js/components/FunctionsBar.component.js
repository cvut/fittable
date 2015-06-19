/**
 * Component wrapping all function control buttons located in upper right corner of the widget.
 * @author Marián Hlaváč
 */

import React from 'react';

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
            <a href="#" className="flags-function"><i className="fa fa-flag"></i></a>
            <a href="#" className="filter-function" onClick={this.handleFilterClick.bind(this)}><i className="fa fa-filter"></i></a>
            <a href="#" className="settings-function" onClick={this.handleSettingsClick.bind(this)} onLayoutSelect><i className="fa fa-cog"></i></a>
            <a href="#" className="search-function" onClick={this.handleSearchClick.bind(this)}><i className="fa fa-search"></i></a>
        </div>;
    }
}
