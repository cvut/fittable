/**
 * Week switcher is displayed after clicking on Week component. It contains three ways of
 * changing the displayed week. You can move it by one semester, one month or choose
 * exact week from calendar displayed in this dropdown.
 * @author Marián Hlaváč
 */

import React from 'react';
import Moment from 'moment';
import CP from 'counterpart';

import Toggleable from './Toggleable.component';

export default class WeekSwitcher extends Toggleable
{
    /**
     * Renders the component
     */
    render()
    {
        var weeks = [ [], [], [], [], [], [], [] ], moments = [ [], [], [], [], [], [], [] ];
        var monthEnd = new Moment( this.props.viewDate ).endOf( 'month' ).endOf( 'isoWeek' );
        var weeki = 0, activeWeekIdx = -1;

        // Create weeks of month array
        for ( var i = new Moment( this.props.viewDate ).startOf( 'month' ).startOf( 'isoWeek' ); i.isBefore( monthEnd ); i.add( 1, 'day' ) )
        {
            weeks[ weeki ].push( i.date() );
            if ( i.isoWeekday() == 7 )
            {
                moments[ weeki ] = new Moment( i ).startOf( 'isoWeek' );
                weeki++;
            }
            if ( i.isSame( this.props.viewDate, 'week' ) ) activeWeekIdx = weeki;
        }

        // Set a semester name
        var semestername = this.props.semester;

        return <div className="week-switcher hide" ref="rootEl">
            <div className="row selector semester-selector collapse">
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).subtract( 6, 'months' ), null )}><i className="fa fa-chevron-left"></i></button>
                </div>
                <div className="column small-6 active-item">
                    {semestername}
                </div>
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).add( 6, 'months' ), null )}><i className="fa fa-chevron-right"></i></button>
                </div>
            </div>
            <div className="row selector month-selector collapse">
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).subtract( 1, 'months' ), null )}><i className="fa fa-chevron-left"></i></button>
                </div>
                <div className="column small-6 active-item">
                    {this.props.viewDate.format( 'MMMM' )}
                </div>
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).add( 1, 'months' ), null )}><i className="fa fa-chevron-right"></i></button>
                </div>
            </div>
            {weeks.map( function( week ) {
                return <div className={'row selector week-selector' + ( activeWeekIdx == weeks.indexOf( week ) + 1 ? ' active-week' : '' ) } key={weeks.indexOf( week )}>
                    <div className="column small-12">
                        {week.map( function( day ) {
                            return <button type="button" onClick={this.props.onDateChange.bind( this, moments[ weeks.indexOf( week ) ] )} key={weeks.indexOf( week ) + '-' + day}>
                                    <div className={'day' + ((weeks.indexOf( week ) == 0 && day > 7 )||(weeks.indexOf( week ) == weeki-1 && day < 7) ? ' in-other' : '')}>{day}</div>
                                </button>;
                        }.bind( this ) ) }
                    </div>
                </div>;
            }.bind( this ) ) }

        </div>;
    }
}
