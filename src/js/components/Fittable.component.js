/**
 * React component
 * @author Marián
 */

import Controls from './Controls.component';
import Timetable from './Timetable.component';

export default class Fittable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        // Temporary actual week getting (this is just a wrong place)
        var d = new Date();
        d.setHours( 0, 0, 0 );
        d.setDate( d.getDate() + 4 - ( d.getDay() || 7 ) );
        var weekno = Math.ceil( ( ( ( d - new Date( d.getFullYear(), 0, 1) ) / 8.64e7 ) + 1 ) / 7 );

        // Set initial states ( actual week and actual year )
        this.state = {
            selectedWeek: weekno,
            selectedYear: d.getFullYear(),
            timeFrom: this.calculateWeekTimeRange().timeFrom,
            timeTo: this.calculateWeekTimeRange().timeTo
        };

        this.weekEvents = null;
    }

    /**
     * Calls external callback, receives new data used for displaying actual week.
     * todo: So far it doesn't have any cache function. Will be implemented soon.
     * todo: It doesn't check, if the incoming array is valid. This is IMPORTANT
     * @param {integer} timeFrom range value used for filtering incoming data, number of milliseconds since unix epoch
     * @param {integer} timeTo range value used for filtering incoming data, number of milliseconds since unix epoch
     * @returns {*} incoming data from external data source
     */
    getWeekEvents( timeFrom, timeTo )
    {
        // todo: tohle bude nejspíš blbě, tak zatím jenom dočasně, ať mám s čím dělat
        return this.props.dataCallback( new Date( timeFrom ), new Date( timeTo ) );
    }

    componentWillMount()
    {
        // Get week events
        this.weekEvents = this.getWeekEvents( new Date( this.state.timeFrom ), new Date( this.state.timeTo ) );
    }

    /**
     * Changes week to specified number. Don't have to be in the range of actual selected week,
     * if it's out of boundary, the year will be changed automatically.
     * After changing the week, all appropriate refresh methods are called.
     * @param {integer} week new week
     */
    changeWeek( week )
    {
        // Cacluclate num of weeks in year
        var yr = this.state.selectedYear;
        var d = new Date(yr, 0, 1);
        var isLeap = ( yr % 400 ) ? ( ( yr % 100 ) ? ( ( yr % 4 ) ? false : true ) : false ) : true;
        var weeksInYear = d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
        var animDirection = null;
        var update = {};

        // Going to previous year
        if ( week < 1 )
        {
            update.selectedYear = this.state.selectedYear - 1;
            yr--;

            // Cacluclate num of weeks in prev year first
            d = new Date(yr, 0, 1);
            isLeap = ( yr % 400 ) ? ( ( yr % 100 ) ? ( ( yr % 4 ) ? false : true ) : false ) : true;

            update.selectedWeek = d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
            animDirection = -1;
        }
        // Going to next year
        else if ( week > weeksInYear )
        {
            update.selectedWeek = 1;
            update.selectedYear = this.state.selectedYear + 1;
            animDirection = 1;
        }
        // Same year
        else
        {
            animDirection = week > this.state.selectedWeek ? 1 : -1;
            update.selectedWeek = week;
            update.selectedYear = this.state.selectedYear;
        }

        // Recalculate ranges
        var timerange = this.calculateWeekTimeRange( update.selectedYear, update.selectedWeek );
        update.timeFrom = timerange.timeFrom;
        update.timeTo = timerange.timeTo;

        this.weekEvents = this.getWeekEvents( timerange.timeFrom , timerange.timeTo );

        // Set states
        this.setState( update );

        // Do the animation
        if ( animDirection == 1 ) this.refs.timetable.animateLeft(); else this.refs.timetable.animateRight();
    }

    /**
     * Calculates new ranges of time. Returns number of milliseconds from day beginning ( 0 - 86400000 ).
     * If no arguments specified, the default values are actual selected week and year from component state.
     * @param {integer} year
     * @param {integer} week
     * @returns {{timeFrom: number, timeTo: number}}
     */
    calculateWeekTimeRange( year = this.state.selectedYear, week = this.state.selectedWeek )
    {
        var yearTimestamp = Date.UTC( year, 0 );
        var firstDayOffset = ( new Date( year, 0 ).getDay() - 1 ) * 3600 * 24 * 1000;

        return {
            timeFrom: yearTimestamp + ( ( week - 1 ) * 3600 * 24 * 7 * 1000 - firstDayOffset ),
            timeTo: yearTimestamp + ( ( week ) * 3600 * 24 * 7 * 1000 - firstDayOffset - 1 )
        };
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="fittable-container">
            <Controls week={this.state.selectedWeek} onWeekChange={this.changeWeek.bind(this)} />
            <Timetable weekEvents={this.weekEvents} from={this.state.timeFrom} to={this.state.timeTo} ref="timetable" />
        </div>;
    }
}
