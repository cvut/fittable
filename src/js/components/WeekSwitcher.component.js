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

    /** Returns a Moment factory constructed from this.props.viewDate */
    viewDateMoment() {
        let moment = new Moment( this.props.viewDate );
        return function() {
            return moment.clone();
        };
    }

    renderSemesterControl() {
        // Set a semester name
        let semesterName = this.props.semester;
        let viewMoment = this.viewDateMoment();

        return <div className="row selector semester-selector collapse">
                    <div className="column small-3 gr-go">
                        <button type="button" onClick={this.props.onDateChange.bind( this, viewMoment().subtract( 6, 'months' ), null )}>
                        <i className="fa fa-chevron-left"></i>
                        </button>
                    </div>
                    <div className="column small-6 active-item">
                        {semesterName}
                    </div>
                    <div className="column small-3 gr-go">
                        <button type="button" onClick={this.props.onDateChange.bind( this, viewMoment().add( 6, 'months' ), null )}>
                        <i className="fa fa-chevron-right"></i>
                        </button>
                    </div>
               </div>;
    }

    renderWeekControl() {
        let viewMoment = this.viewDateMoment();

        return <div className="row selector month-selector collapse">
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, viewMoment().subtract( 1, 'months' ), null )}>
                    <i className="fa fa-chevron-left"></i>
                    </button>
                </div>
                <div className="column small-6 active-item">
                    {viewMoment().format( 'MMMM' )}
                </div>
                <div className="column small-3 gr-go">
                    <button type="button" onClick={this.props.onDateChange.bind( this, viewMoment().add( 1, 'months' ), null )}>
                    <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>;
    }

    /**
     * Renders the component
     */
    render()
    {
        let viewMoment = this.viewDateMoment();
        var weeks = [ [], [], [], [], [], [], [] ], moments = [ [], [], [], [], [], [], [] ];
        var monthEnd = viewMoment().endOf( 'month' ).endOf( 'isoWeek' );
        var weeki = 0, activeWeekIdx = -1;

        // Create weeks of month array
        for ( var i = viewMoment().startOf( 'month' ).startOf( 'isoWeek' ); i.isBefore( monthEnd ); i.add( 1, 'day' ) )
        {
            weeks[ weeki ].push( i.date() );
            if ( i.isoWeekday() === 7 )
            {
                moments[ weeki ] = new Moment( i ).startOf( 'isoWeek' );
                weeki++;
            }

            if ( i.isSame( this.props.viewDate, 'week' ) ) {
                activeWeekIdx = weeki;
            }
        }

        function activeWeekClass(week) {
            if( activeWeekIdx === (weeks.indexOf( week ) + 1) ) {
                return 'active-week';
            }
            else {
                return '';
            }
        }

        /**
         * Whether the given day is within the month of beginning of a given week.
         * Returns a class if yes.
         */
        function dayClass(week, day) {
            let weekIndex = weeks.indexOf( week );
            if( (day > 7 && weekIndex === 0) || (day < 7 && weekIndex === (week - 1)) ) {
                return 'in-other';
            }
            else {
                return '';
            }
        }

        return <div className="week-switcher hide" ref="rootEl">
            {this.renderSemesterControl()}
            {this.renderWeekControl()}
            {weeks.map( function( week ) {
                return <div className={'row selector week-selector ' + activeWeekClass(week) } key={weeks.indexOf( week )}>
                    <div className="column small-12">
                        {week.map( function( day ) {
                            return <button type="button" onClick={this.props.onDateChange.bind( this, moments[ weeks.indexOf( week ) ] )} key={weeks.indexOf( week ) + '-' + day}>
                                    <div className={'day' + dayClass(week, day)}>{day}</div>
                                </button>;
                        }.bind( this ) ) }
                    </div>
                </div>;
            }.bind( this ) ) }

        </div>;
    }
}
