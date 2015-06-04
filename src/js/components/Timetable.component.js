/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 * @author Marián Hlaváč
 */

import Day from './Day.component';
import Moment from '../../../bower_components/moment/moment.js';

export default class Timetable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        this.state = {
            detailShownOn: -1,
            popupsOpened : 0
        };
    }

    /**
     * Replays the CSS animation of all events from right side to the left.
     */
    animateLeft()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-left"); }, 50 );
    }

    /**
     * Replays the CSS animation of all events from left side to the right.
     */
    animateRight()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-right"); }, 50 );
    }

    /**
     * Changes the ID of currently displayed EventDetail.
     * @param key EventDetail to display
     */
    showDetailOn( key )
    {
        var prevkey = this.state.detailShownOn;

        // If it's called on the same event, close all.
        if ( key == this.state.detailShownOn ) key = -1;

        // Calculate num of shown popups
        var popups = this.state.popupsOpened;
        if ( prevkey == -1 && key != -1 ) popups++;
        if ( prevkey != -1 && key == -1 ) popups--;

        this.setState( { detailShownOn: key, popupsOpened: popups } );
    }

    /**
     * Renders the component
     */
    render()
    {
        var weekEvents = [ [], [], [], [], [], [], [] ];
        var firstDayStart = new Moment( this.props.viewDate ).startOf( 'day' );

        // Timeline hours from - to
        var timelineHourFrom = 7;
        var timelineHourTo = 20;

        // Timeline length in milliseconds
        var timelineLength = new Moment( firstDayStart ).hour( timelineHourTo ).diff( new Moment( firstDayStart ).hour( timelineHourFrom ) );

        // Make sure the weekEvents data are available...
        if ( this.props.weekEvents !== undefined && this.props.weekEvents !== null )
        {
            for ( var event of this.props.weekEvents )
            {
                var dateStart = new Moment( event.startsAt ), dateEnd = new Moment( event.endsAt );
                var dayStart = new Moment( event.startsAt ).startOf( 'day' ).hour( timelineHourFrom );

                // Calculate event length and position, relative to timeline
                var eventLength = dateEnd.diff( dateStart );
                event._draw_length = eventLength / timelineLength;
                var eventStart = dateStart.diff( dayStart );
                event._draw_position = ( eventStart ) / ( timelineLength );

                // Sort events by day of week
                weekEvents[ dateStart.isoWeekday() - 1 ].push( event );
            }
        }

        return <div className={'table a-left ' + (this.state.popupsOpened > 0 ? 'muted ' : '' ) + this.props.layout} ref="rootEl">
            <div className="grid-overlay"><div className="grid"></div></div>
            <div className="days" ref="days">
                <Day id="0" dayNum="18" events={weekEvents[0]} onDetailShow={this.showDetailOn.bind(this)}
                    showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter} />
                <Day id="1" dayNum="19" events={weekEvents[1]} onDetailShow={this.showDetailOn.bind(this)}
                    showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter}  />
                <Day id="2" dayNum="20" events={weekEvents[2]} onDetailShow={this.showDetailOn.bind(this)}
                    showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter}  />
                <Day id="3" dayNum="21" events={weekEvents[3]} onDetailShow={this.showDetailOn.bind(this)}
                    showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter}  />
                <Day id="4" dayNum="22" events={weekEvents[4]} onDetailShow={this.showDetailOn.bind(this)}
                    showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter}  />
            </div>
            <div className="clearfix"></div>
        </div>;
    }
}
