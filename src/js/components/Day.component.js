/**
 * React component
 * @author Marián
 */

import EventBox from './EventBox.component';
import Moment from '../../../bower_components/moment/moment.js';

export default class Day extends React.Component
{
    construtor( props )
    {
        super.constructor( props );
    }

    cmpByStart( lhs, rhs )
    {
        return ( lhs.startsAt < rhs.startsAt ? -1 : ( lhs.startsAt > rhs.startsAt ? 1 : 0 ) );
    }

    findOverlayedEvents( props )
    {
        var lastend = null, prev, overlayed = [];
        for ( var event of props.events.sort( this.cmpByStart ) )
        {
            if ( lastend !== null && event.startsAt < lastend )
            {
                overlayed.push( event );
                if ( overlayed.indexOf( prev ) == -1 ) overlayed.push( prev );
            }
            else
            {
                event.appear = "regular";

                for ( var ovrld of overlayed )
                    ovrld.appear = overlayed.length == 2 ? "half" : "third";

                overlayed = [];
            }

            lastend = event.endsAt;
            prev = event;
        }

        for ( var ovrld of overlayed )
            ovrld.appear = overlayed.length == 2 ? "half" : "third";

        overlayed = [];

        return props.events;
    }

    hideAllEventDetails( except )
    {
        for ( var child in this.refs.events.props.children)
        {
            child.hideDetail();
        }
    }


    /**
     * Renders the component
     */
    render()
    {
        var events = this.findOverlayedEvents( this.props );

        return <div className="day" data-day="{this.props.id}">
                <div className="label"><span className="day-num">{this.props.dayNum}</span>
                <span className="day-name">{new Moment().isoWeekday(parseInt(this.props.id) + 1).format( 'dddd' )}</span>
            </div>
            <div className="events" ref="events">
                {events.map( function( event ) {
                    return <EventBox key={event.id} data={event} onDetailShow={this.props.onDetailShow} />;
                }.bind(this) ) }
            </div>
        </div>;
    }
}
