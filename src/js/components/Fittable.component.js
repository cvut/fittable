/**
 * Root component drawing whole widget.
 * @author Marián Hlaváč
 */

import Moment from '../../../bower_components/moment/moment.js';

import Controls from './Controls.component';
import Timetable from './Timetable.component';
import DataCache from '../modules/DataCache.module';
import FunctionsSidebar from './FunctionsSidebar.component';

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
            },
            grid: {
                starts: 7.5,
                ends: 21.5,
                lessonDuration: 1.75
            },
            functionOpened: null
        };

        // Declare weekEvents variable
        this.weekEvents = null;

        // Force a refresh every one minute
        setInterval( this.handleRefreshNeed, 60000 );
    }

    /**
     * Calls external data callback, telling that new data should be grabbed from source. If the required data are
     * present in cache, use them instead of calling data callback.
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
     * Callback saving received data from source / cache to weekEvents variable.
     * If the data are from cache, the second argument should be true.
     * @param {Array} data Data array
     * @param {boolean} alreadyCached The data come from cache and shouldn't be cached again
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

    /**
     * Tests if data are valid.
     * @param data Incoming data
     * @returns {boolean} Data are valid
     */
    static areDataValid( data )
    {
        if ( typeof data !== 'undefined' && data !== null )
        {
            for ( var event of data )
            {
                // Test if dates are valid ( using Moment.js validation )
                if ( ! new Moment( event.startsAt ).isValid() ) return false;
                if ( ! new Moment( event.endsAt ).isValid() ) return false;

                // todo: Tests missing!
            }

            // Everything seems correct
            return true;
        }
        else
            return false;
    }

    componentWillMount()
    {
        // Get week events
        this.getWeekEvents();
    }

    /**
     * Changes view date to specified moment. The moment should be the beginning of the week.
     * @param {Moment} viewDate New view date
     */
    handleChangeViewDate( viewDate )
    {
        // Update viewDate
        var newdate = new Moment( viewDate );

        // Animate in correct direction
        if ( newdate.isAfter( this.state.viewDate ) ) this.refs.timetable.animateLeft(); else this.refs.timetable.animateRight();

        // Update the viewDate state
        this.setState( { viewDate: newdate } );

        // Update the data
        this.getWeekEvents();
    }

    /**
     * Handler for layout changing event.
     * @param {string} to New layout setting
     */
    handleChangeLayout( to )
    {
        this.setState( { layout: to } );
    }

    /**
     * Handler for filter changing event.
     * @param {Array} to New filter setting
     */
    handleChangeFilter( to )
    {
        this.setState( { displayFilter: to } );
    }

    /**
     * Opens different / closes settings panel in FunctionsSidebar component.
     * @param to Panel to change
     */
    handleChangeSettingsPanel( to )
    {
        this.setState( { functionOpened: ( this.state.functionOpened == to ? null : to ) } );
    }

    /**
     * Force a refresh by calling setState with no state update
     */
    handleRefreshNeed()
    {
        this.setState( {} );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="fittable-container">

            <Controls viewDate={this.state.viewDate} onWeekChange={this.handleChangeViewDate.bind(this)}
                onDateChange={this.handleChangeViewDate.bind(this)}
                onSettingsPanelChange={this.handleChangeSettingsPanel.bind(this)} />

            <div className="clearfix"></div>

            <FunctionsSidebar opened={this.state.functionOpened} displayFilter={this.state.displayFilter}
                onFilterChange={this.handleChangeFilter.bind(this)} onLayoutChange={this.handleChangeLayout.bind(this)}
                onRefreshNeed={this.handleRefreshNeed.bind(this)} />

            <Timetable grid={this.state.grid} viewDate={this.state.viewDate} layout={this.state.layout}
                weekEvents={this.state.weekEvents} displayFilter={this.state.displayFilter}
                functionsOpened={this.state.functionOpened} ref="timetable" />

        </div>;
    }
}

Fittable.defaultProps = { dataCallback: null, locale: 'cs' };
