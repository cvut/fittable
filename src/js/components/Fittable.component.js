/**
 * React component
 * @author Marián
 */

import Controls from './Controls.component';
import Timetable from './Timetable.component';
import Moment from '../../../bower_components/moment/moment.js';
import DataCache from '../modules/DataCache.module';

export default class Fittable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        // Set initial states ( today's week and layout )
        // todo: layout initialization should be loaded from some kind of localstorage data
        this.state = {
            viewDate: new Moment().startOf( 'isoweek' ),
            layout: 'horizontal',
            displayFilter: {
                'laboratory': true,
                'tutorial': true,
                'lecture': true,
                'exam': true,
                'assessment': true,
                'onetime': true,
                'other': true
            }
        };

        // Declare weekEvents variable
        this.weekEvents = null;
    }

    /**
     * Calls external callback, receives new data used for displaying actual week.
     * todo: It doesn't check, if the incoming array is valid. This is IMPORTANT
     * @param {integer} timeFrom range value used for filtering incoming data, number of milliseconds since unix epoch
     * @param {integer} timeTo range value used for filtering incoming data, number of milliseconds since unix epoch
     * @returns {*} incoming data from external data source
     */
    getWeekEvents( )
    {
        var dateFrom = this.state.viewDate.toISOString();
        var dateTo = new Moment( this.state.viewDate ).endOf('isoweek').toISOString();

        // Try to load data from the cache
        var cacheData = DataCache.lookupCache( dateFrom, dateTo );

        if ( cacheData !== null ) {
            // Use cache data
            this.setWeekEvents( cacheData, true ).bind( this );
        }
        else {
            // Require new data
            this.props.dataCallback( dateFrom, dateTo, this.setWeekEvents.bind( this ) );
        }
    }

    /**
     * Callback used to save loaded data.
     * @param data
     * @param alreadyCached
     */
    setWeekEvents( data, alreadyCached = false )
    {
        // Cache data if needed
        if ( ! alreadyCached )
        {
            var dateFrom = this.state.viewDate.toISOString();
            var dateTo = new Moment( this.state.viewDate ).endOf( 'isoweek' ).toISOString();
            DataCache.cacheData( dateFrom, dateTo, data );
        }

        // Set the data into state
        if ( Fittable.areDataValid( data ) )
            this.setState( { weekEvents: data } );
        else
            alert( 'Data invalid!' ); // todo: alert through UI
    }

    static areDataValid( data )
    {
        if ( data !== null )
        {
            for ( var event of data )
            {
                if ( ! new Moment( event.startsAt ).isValid() ) return false;
                if ( ! new Moment( event.endsAt ).isValid() ) return false;
            }
            return true;
        } else return false;
    }

    componentWillMount()
    {
        // Get week events
        this.getWeekEvents();
    }

    /**
     * Changes week to specified number. Don't have to be in the range of actual selected week,
     * if it's out of boundary, the year will be changed automatically.
     * After changing the week, all appropriate refresh methods are called.
     * @param {integer} week new week
     */
    handleChangeViewDate( week )
    {
        // Update viewDate
        var newdate = new Moment( week );

        // Animate in correct direction
        if ( newdate.isAfter( this.state.viewDate ) ) this.refs.timetable.animateLeft(); else this.refs.timetable.animateRight();

        // Update the viewDate state
        this.setState( { viewDate: newdate } );

        // Update the data
        this.getWeekEvents();
    }

    handleChangeLayout( to )
    {
        this.setState( { layout: to } );
    }

    handleChangeFilter( to )
    {
        this.setState( { displayFilter: to } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="fittable-container">
            <Controls viewDate={this.state.viewDate} onWeekChange={this.handleChangeViewDate.bind(this)}
                onLayoutChange={this.handleChangeLayout.bind(this)} onDateChange={this.handleChangeViewDate.bind(this)}
                displayFilter={this.state.displayFilter} onFilterChange={this.handleChangeFilter.bind(this)} />
            <Timetable weekEvents={this.state.weekEvents} viewDate={this.state.viewDate} layout={this.state.layout}
                displayFilter={this.state.displayFilter} ref="timetable" />
        </div>;
    }
}
