/**
 * React component
 * @author Marián
 */

import FunctionSettings from './FunctionSettings.component';

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

    onSettingsClick( e )
    {
        this.refs.functionSettings.toggle();
    }
    /**
     * Renders the component
     */
    render()
    {
        return <div className="functions-bar">
            <a href="#" className="refresh-function" onClick={this.onRefresh.bind(this)}><i className="fa fa-refresh"></i></a>
            <a href="#" className="flags-function"><i className="fa fa-flag"></i></a>
            <a href="#" className="settings-function" onClick={this.onSettingsClick.bind(this)}><i className="fa fa-cog"></i></a>
            <a href="#" className="search-function"><i className="fa fa-search"></i></a>
            <div className="functions">
                <FunctionSettings ref="functionSettings" />
            </div>
        </div>;
    }
}
