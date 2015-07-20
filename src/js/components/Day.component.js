/**
 * Component representing one row (day) in timetable.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';
import Moment from 'moment';

import EventBox from './EventBox.component';

export default class Day extends React.Component
{
    construtor( props )
    {
        super.constructor( props );
    }

    /**
     * Compare function - compares by 'startsAs' member variable
     * @param lhs Left hand side
     * @param rhs Right hand side
     * @returns {number} Comparison result
     */
    cmpByStart( lhs, rhs )
    {
        return ( lhs.startsAt < rhs.startsAt ? -1 : ( lhs.startsAt > rhs.startsAt ? 1 : 0 ) );
    }

    /**
     * Finds all overlayed events and returns updated events array with appear property
     * @param props Props
     * @returns {*} Updated events
     */
    findOverlayedEvents( props )
    {
        var overlayed = [], lastend = new Moment( 0 );
        var events = props.events.sort( this.cmpByStart );

        for ( var evid in events )
        {
            /*
                Compares this event's start with the last end. If the start is after the last end,
                set appropriate appearances for all events in queue.
            */

            var start = new Moment( events[evid].startsAt );

            // Compare
            if ( start.isAfter( lastend ) || start.isSame( lastend ) )
            {
                var appearance = overlayed.length >= 4 ? 'quarter' : ( overlayed.length == 3 ? 'third' : ( overlayed.length == 2 ? 'half' : 'regular' ) );

                for ( var oid in overlayed )
                {
                    events[overlayed[oid]].appear = appearance;
                    if ( overlayed.length >= 4 && oid % 4 == 0 ) events[overlayed[oid]].appear += '-m';
                }

                overlayed = [];
            }

            // Queue the event
            overlayed.push( evid );

            // Set event's end as last end
            if ( new Moment( events[evid].endsAt ).isAfter( lastend ) ) lastend = new Moment( events[evid].endsAt );
        }

        // Set appearance for the last events

        var appearance = overlayed.length >= 4 ? 'quarter' : ( overlayed.length == 3 ? 'third' : ( overlayed.length == 2 ? 'half' : 'regular' ) );

        for ( var oid in overlayed )
        {
            events[overlayed[oid]].appear = appearance;
            if ( overlayed.length >= 4 && oid % 4 == 0 ) events[overlayed[oid]].appear += '-m';
        }

        return events;
    }

    /**
     * Renders the component
     */
    render()
    {
        var events = this.findOverlayedEvents( this.props );

        return <div className={'day' + ( this.props.active ? ' active' : '') + ( this.props.selected ? ' selected' : '')} data-day={this.props.id}>
                <div className="label" title={ this.props.active ? CP.translate( 'timetable.actual_day', { day: new Moment().isoWeekday(parseInt(this.props.id) + 1).format( 'dddd' ) } ) : '' }>
                    <span className="day-num">{this.props.dayNum}</span>
                    <span className="day-name">{new Moment().isoWeekday(parseInt(this.props.id) + 1).format( 'dddd' )}</span>
                </div>
            <div className="events" ref="events">
                {events.map( function( event ) {
                    if ( this.props.displayFilter[event.type] == false ) event.appear = 'hide';
                    return <EventBox key={event.id} data={event} detailShown={event.id == this.props.showDetailOn}
                        onClick={this.props.onDetailShow} openFromBottom={this.props.id >= 3} colored={this.props.colored}
                        onViewChange={this.props.onViewChange} onDateChange={this.props.onDateChange} linkNames={this.props.linkNames} />;
                }.bind(this) ) }
            </div>
        </div>;
    }
}
