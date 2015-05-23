/**
 * React component
 * @author Marián
 */

import EventBox from './EventBox.component';

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


    /**
     * Renders the component
     */
    render()
    {
        var events = this.findOverlayedEvents( this.props );

        // Temporarily keeping day names here. In future, we'll have separated location strings elsewhere
        var dayNames = [ "pondělí", "úterý", "středa", "čtvrtek", "pátek" ];

        return <div className="day" data-day="{this.props.id}">
            <div className="label"><span className="day-name">{dayNames[this.props.id]}</span></div>
            <div className="events">
                {events.map( function( event ) {
                    return <EventBox key={event.id} data={event} />;
                } ) }
            </div>
        </div>;
    }
}
