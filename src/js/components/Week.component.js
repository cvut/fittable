/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 * @author Marián Hlaváč
 */

import Moment from 'moment';
import CP from 'counterpart';

export default class Week extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        this.state = {
            icon: 'fa fa-caret-down'
        };
    }

    /**
     * Handles the click, togging the WeekSwitcher (delegating signal to parent) and changing the icon
     */
    handleClick()
    {
        this.props.onClick();
        this.setState( { icon: ( this.state.icon == 'fa fa-caret-down' ? 'fa fa-caret-up': 'fa fa-caret-down' ) } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="week" title={CP.translate('timetable.actual')}>
            <a href="#" className="date-selection" onClick={this.handleClick.bind(this)}>
                <strong className="today">{new Moment( this.props.viewDate ).isoWeekday( this.props.selectedDay + 1).format('dddd')}</strong>
                <strong className="week-text">{CP.translate( 'week', { num: this.props.viewDate.isoWeek() } )}&nbsp;&nbsp;</strong>
                <span className="week-parity-text">{CP.translate( this.props.viewDate.isoWeek() % 2 == 0 ? 'even' : 'odd' )}</span>
                <i className={this.state.icon}></i>
            </a>
        </div>;
    }
}
