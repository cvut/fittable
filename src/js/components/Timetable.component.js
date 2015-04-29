/**
 * React component
 * @author Marián
 */

import Day from './Day.component';

export default class Timetable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    animateLeft()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-left"); }, 50 );
    }

    animateRight()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-right"); }, 50 );
    }

    /**
     * Renders the component
     */
    render()
    {
        var weekEvents = [ [], [], [], [], [], [], [] ];

        // Timeline length
        var timelineFrom = 8 * 3600 * 1000;
        var timelineTo = 18 * 3600 * 1000;

        // Parse each event, do
        for ( var event of this.props.weekEvents )
        {
            // Calculate event position, related to timeline
            var startTime = ( event.startsAt.getUTCHours() * 3600 + event.startsAt.getUTCMinutes() * 60 + event.startsAt.getUTCSeconds() ) * 1000;
            var endTime = ( event.endsAt.getUTCHours() * 3600 + event.endsAt.getUTCMinutes() * 60 + event.endsAt.getUTCSeconds() ) * 1000;
            var lengthTime = endTime - startTime;

            // Add drawing properties to events
            event._draw_position = (startTime - timelineFrom) / ( timelineTo - timelineFrom );
            event._draw_length = lengthTime / ( timelineTo - timelineFrom );

            // Sort events by day of week
            weekEvents[ Math.floor( ( event.startsAt.getTime() - this.props.from ) / (24 * 3600 * 1000) ) ].push( event );
        }

        return <div className="table a-left" ref="rootEl">
            <div className="grid-overlay"><div className="grid"></div></div>
            <Day id="0" events={weekEvents[0]} />
            <Day id="1" events={weekEvents[1]} />
            <Day id="2" events={weekEvents[2]} />
            <Day id="3" events={weekEvents[3]} />
            <Day id="4" events={weekEvents[4]} />
        </div>;
    }
}
