/**
 * Function component, filtering function
 * Provides ability to filter out some types of events from timetable
 * @author Marián Hlaváč
 */

import Toggleable from './Toggleable.component';

export default class FunctionFilter extends Toggleable
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handles clicking on one filter item
     * @param {string} filter Clicked filter item
     */
    handleToggleFilter( filter )
    {
        var newfilters = this.props.displayFilter;
        newfilters[ filter ] = ! newfilters[ filter ];

        this.props.onFilterChange( newfilters );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-filter hide" ref="rootEl">
            <div className="clearfix"></div>
            <h2>filtrovat</h2>

            <ul className="filtering">
                <li className={ this.props.displayFilter['lecture'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'lecture')}>
                    <i className="fa fa-check"></i>
                    Přednášky
                </li>
                <li className={ this.props.displayFilter['tutorial'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'tutorial')}>
                    <i className="fa fa-check"></i>
                    Cvičení
                </li>
                <li className={ this.props.displayFilter['laboratory'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'laboratory')}>
                    <i className="fa fa-check"></i>
                    Laboratoře
                </li>
                <li className={ this.props.displayFilter['exam'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'exam')}>
                    <i className="fa fa-check"></i>
                    Zkoušky
                </li>
                <li className={ this.props.displayFilter['assessment'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'assessment')}>
                    <i className="fa fa-check"></i>
                    Obhajoby
                </li>
                <li className={ this.props.displayFilter['onetime'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'onetime')}>
                    <i className="fa fa-check"></i>
                    Jednorázové akce
                </li>
                <li className={ this.props.displayFilter['other'] ? 'active' : '' } onClick={this.handleToggleFilter.bind(this, 'other')}>
                    <i className="fa fa-check"></i>
                    Ostatní
                </li>
            </ul>
            <div className="clearfix"></div>
        </div>;
    }
}
