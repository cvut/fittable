/**
 * Component representing one row (day) in timetable.
 * @author Marián Hlaváč
 */

import EventBox from './EventBox.component';
import Moment from '../../../bower_components/moment/moment.js';

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
        var lastend = null, prev, overlayed = [];

        for ( var event of props.events.sort( this.cmpByStart ) )
        {
            // Default appearance is regular
            event.appear = 'regular';

            // If this event overlays with previous...
            if ( lastend !== null && event.startsAt < lastend )
            {
                // Mark this event as overlayed event
                overlayed.push( event );

                // And if it already isn't, mark the previous too
                if ( overlayed.indexOf( prev ) == -1 ) overlayed.push( prev );
            }
            else
            {
                // If no more overlayed events are found, mark overlays and clear the overlayed array...

                // For every marked event, depending on count of overlays, assign appearance class
                for ( var ovrld of overlayed )
                    ovrld.appear = overlayed.length == 2 ? "half" : "third";

                overlayed = [];
            }

            lastend = event.endsAt;
            prev = event;
        }

        // If no more events are found, mark overlays
        for ( var ovrld of overlayed )
            ovrld.appear = overlayed.length == 2 ? "half" : "third";

        return props.events;
    }

    /**
     * Renders the component
     */
    render()
    {
        var events = this.findOverlayedEvents( this.props );

        return <div className={'day' + ( this.props.active ? ' active' : '')} data-day="{this.props.id}">
                <div className="label"><span className="day-num">{this.props.dayNum}</span>
                <span className="day-name">{new Moment().isoWeekday(parseInt(this.props.id) + 1).format( 'dddd' )}</span>
            </div>
            <div className="events" ref="events">
                {events.map( function( event ) {
                    if ( this.props.displayFilter[event.type] == false ) event.appear = 'hide';
                    return <EventBox key={event.id} data={event} detailShown={event.id == this.props.showDetailOn} onClick={this.props.onDetailShow} />;
                }.bind(this) ) }
            </div>
        </div>;
    }
}
