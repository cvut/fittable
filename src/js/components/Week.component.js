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

    dayOfWeek() {
        return new Moment( this.props.viewDate ).isoWeekday( this.props.selectedDay + 1).format('dddd');
    }

    weekNum() {
        return CP.translate( 'week', { num: this.props.viewDate.isoWeek() } );
    }

    month() {
        return new Moment( this.props.viewDate ).isoWeekday( this.props.selectedDay + 1).format('MMMM');
    }

    weekParity() {
        return CP.translate( this.props.viewDate.isoWeek() % 2 === 0 ? 'even' : 'odd' );
    }

    icon() {
        return this.state.open ? 'fa fa-caret-up' : 'fa fa-caret-down';
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="week-toggle date-selection">
                <span className="week-toggle-inner">
                <strong className="week-toggle-month">{this.month()}</strong>{', '}
                <strong className="week-toggle-dow">{this.dayOfWeek()}</strong>{' '}
                <strong className="week-toggle-num">{this.weekNum()}&nbsp;&nbsp;</strong>
                <span className="week-toggle-parity">{this.weekParity()}</span>
                </span>
               </div>;
    }
}
