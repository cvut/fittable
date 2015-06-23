/**
 * Week controller located in upper left corner, displaying actual week.
 * On click it toggles the WeekSwitcher component
 * @author Marián Hlaváč
 */

import React from 'react';
import Moment from 'moment';
import CP from 'counterpart';

export default class Week extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        this.state = {
            open: false
        };
    }

    /**
     * Handles the click, togging the WeekSwitcher (delegating signal to parent) and changing the icon
     */
    handleClick()
    {
        this.props.onClick();
        this.setState( {open: !this.state.open} );
    }

    dayOfWeek() {
        return new Moment( this.props.viewDate ).isoWeekday( this.props.selectedDay + 1).format('dddd');
    }

    weekNum() {
        return CP.translate( 'week', { num: this.props.viewDate.isoWeek() } );
    }

    weekParity() {
        return CP.translate( this.props.viewDate.isoWeek() % 2 === 0 ? 'even' : 'odd' );
    }

    icon() {
        return this.state.icon ? 'fa fa-caret-up' : 'fa fa-caret-down';
    }

    /**
     * Renders the component
     */
    render()
    {
        return <button type="button" className="week-toggle date-selection" onClick={this.handleClick.bind(this)}>
                <span className="week-toggle-inner">
                <strong className="week-toggle-dow">{this.dayOfWeek()}</strong>{' '}
                <strong className="week-toggle-num">{this.weekNum()}&nbsp;&nbsp;</strong>
                <span className="week-toggle-parity">{this.weekParity()}</span>
                <i className={this.icon()}></i>
                </span>
               </button>;
    }
}
