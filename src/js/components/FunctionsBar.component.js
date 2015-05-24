/**
 * React component
 * @author Marián
 */

import FunctionSettings from './FunctionSettings.component';
import FunctionSearch from './FunctionSearch.component';

export default class FunctionsBar extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    onRefresh( e )
    {
        this.props.onRefresh( this.props.week );
    }

    hideAllToggleable( except )
    {
        for ( var child of this.refs.functions.props.children )
            if ( child.ref != except ) this.refs[child.ref].hide();
    }

    onSettingsClick( e )
    {
        this.hideAllToggleable( 'functionSettings' );
        this.refs.functionSettings.toggle();
    }

    onSearchClick( e )
    {
        this.hideAllToggleable( 'functionSearch' );
        this.refs.functionSearch.toggle();
    }
    /**
     * Renders the component
     */
    render()
    {
        return <div className="functions-bar">
            <a href="#" className="refresh-function" onClick={this.onRefresh.bind(this)}><i className="fa fa-refresh"></i></a>
            <a href="#" className="flags-function"><i className="fa fa-flag"></i></a>
            <a href="#" className="settings-function" onClick={this.onSettingsClick.bind(this)} onLayoutSelect><i className="fa fa-cog"></i></a>
            <a href="#" className="search-function" onClick={this.onSearchClick.bind(this)}><i className="fa fa-search"></i></a>
            <div className="functions" ref="functions">
                <FunctionSettings ref="functionSettings" onLayoutChange={this.props.onLayoutChange} />
                <FunctionSearch ref="functionSearch" />
            </div>
        </div>;
    }
}
