/**
 * Component rendering whole timetable, containing hierarchy of week, day and events components.
 * @author Marián Hlaváč
 */

import Day from './Day.component';
import NowIndicator from './NowIndicator.component';
import Moment from '../../../node_modules/moment/moment.js';

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
     * Hides the days element by removing its animation property class
     */
    hide()
    {
        var el = this.refs.days.getDOMNode();

        // Replay CSS animation
        el.classList.remove("a-left");
        el.classList.remove("a-right");
    }

    /**
     * Replays the CSS animation of all events from right side to the left.
     */
    animateLeft()
    {
        var el = this.refs.days.getDOMNode();

        // Replay CSS animation
        el.classList.remove("a-left");
        el.classList.remove("a-right");
        setTimeout( () => { el.classList.add("a-left"); }, 50 );
    }

    /**
     * Replays the CSS animation of all events from left side to the right.
     */
    animateRight()
    {
        var el = this.refs.days.getDOMNode();

        // Replay CSS animation
        el.classList.remove("a-left");
        el.classList.remove("a-right");
        setTimeout( () => { el.classList.add("a-right"); }, 50 );
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
        var weekEvents = [ [], [], [], [], [], [], [] ],
            firstDayStart = new Moment( this.props.viewDate ).startOf( 'day' ),
            minClosestDiff = Infinity,
            closestEvent = null;

        // Timeline hours from - to
        var timelineHoursFrom = Math.floor( this.props.grid.starts ),
            timelineHoursTo = Math.floor( this.props.grid.ends ),
            timelineMinutesFrom = Math.floor( ( this.props.grid.starts - timelineHoursFrom ) * 60 ),
            timelineMinutesTo = Math.floor( ( this.props.grid.ends - timelineHoursTo ) * 60 );

        // Timeline length in milliseconds
        var timelineLength = new Moment( firstDayStart ).hour( timelineHoursTo ).minutes( timelineMinutesTo )
                        .diff( new Moment( firstDayStart ).hour( timelineHoursFrom ).minutes( timelineMinutesFrom ) );

        // Timeline grid length
        var timelineGridLength = this.props.grid.lessonDuration * 3600000 / timelineLength;

        // Make sure the weekEvents data are available...
        if ( typeof this.props.weekEvents !== 'undefined' && this.props.weekEvents !== null )
        {
            for ( var event of this.props.weekEvents )
            {
                var dateStart = new Moment( event.startsAt ), dateEnd = new Moment( event.endsAt );
                var dayStart = new Moment( event.startsAt ).startOf( 'day' )
                                            .hour( timelineHoursFrom ).minutes( timelineMinutesFrom );

                // Calculate event length and position, relative to timeline
                var eventLength = dateEnd.diff( dateStart );
                event._draw_length = eventLength / timelineLength;
                var eventStart = dateStart.diff( dayStart );
                event._draw_position = eventStart / timelineLength;

                // Sort events by day of week
                weekEvents[ dateStart.isoWeekday() - 1 ].push( event );

                // Search for closest event from now
                var diffwithnow = dateStart.diff( new Moment() );
                if ( diffwithnow < minClosestDiff && diffwithnow > 0 )
                {
                    minClosestDiff = diffwithnow;
                    closestEvent = event;
                }
            }
        }

        // Today
        var todayId = -1;
        var today = new Moment();
        if ( this.props.viewDate.isSame( today, 'isoWeek' ) )
        {
            todayId = today.isoWeekday() - 1;
        }

        // Create array of hour labels
        var hourlabels = [];
        for ( var i = 0; i < 1 / timelineGridLength - 1; i++ )
        {
            hourlabels.push( <div className="hour-label" key={i} style={{ width: timelineGridLength * 100 + '%',
                height: timelineGridLength * 100 + '%', left: i * timelineGridLength * 100 + '%',
                top: i * timelineGridLength * 100 + '%' }} > {i+1} </div> );
        }

        // Create days
        var days = [];
        for ( i = 0; i < 6; i++ )
        {
            days.push( <Day id={i} key={i} dayNum={new Moment( this.props.viewDate ).isoWeekday( i + 1 ).date()}
                events={weekEvents[i]} onDetailShow={this.showDetailOn.bind(this)}
                showDetailOn={this.state.detailShownOn} displayFilter={this.props.displayFilter}
                active={todayId == i} selected={this.props.selectedDay == i} colored={this.props.colored} /> );
        }

        return <div className={'table ' + (this.state.popupsOpened > 0 ? 'muted ' : '' ) + this.props.layout +
        ( this.props.functionsOpened !== null ? ' cut' : '' ) + ( this.props.days7 ? ' 7days' : '' )} ref="rootEl">
            <div className="grid-overlay">
                <div className="grid-wrapper">
                    <div className="grid hor" style={{ backgroundSize: ( timelineGridLength * 100 ) + '% 100%' }}></div>
                    <div className="grid ver" style={{ backgroundSize: '100% ' + ( timelineGridLength * 100 ) + '%' }}></div>
                </div>
            </div>
            <NowIndicator timelineStartHour={timelineHoursFrom} timelineStartMins={timelineMinutesFrom}
                timelineLength={timelineLength} viewDate={this.props.viewDate} closestEvent={closestEvent} />
            <div className="days a-right" ref="days">
                {days.map( function( day ) { return day; } )}
            </div>
            <div className="clearfix"></div>
            <div className="hour-labels">
                {hourlabels.map( function( label ) { return label; } )}
            </div>
        </div>;
    }
}
