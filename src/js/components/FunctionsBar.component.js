/**
 * React component
 * @author Marián
 */

import FunctionSettings from './FunctionSettings.component';
import FunctionSearch from './FunctionSearch.component';
import FunctionFilter from './FunctionFilter.component';

export default class FunctionsBar extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }
    hideAllToggleable( except )
    {
        for ( var child of this.refs.functions.props.children )
            if ( child.ref != except ) this.refs[child.ref].hide();
    }

    handleSettingsClick()
    {
        this.hideAllToggleable( 'functionSettings' );
        this.refs.functionSettings.toggle();
    }

    handleSearchClick()
    {
        this.hideAllToggleable( 'functionSearch' );
        this.refs.functionSearch.toggle();
    }

    handleFilterClick()
    {
        this.hideAllToggleable( 'functionFilter' );
        this.refs.functionFilter.toggle();
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
            <div className="functions" ref="functions">
                <FunctionSettings ref="functionSettings" onLayoutChange={this.props.onLayoutChange} />
                <FunctionSearch ref="functionSearch" />
                <FunctionFilter ref="functionFilter" displayFilter={this.props.displayFilter} onFilterChange={this.props.onFilterChange} />
            </div>
        </div>;
    }
}
