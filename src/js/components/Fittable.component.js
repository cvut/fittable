/**
 * Root component drawing whole widget.
 * @author Marián Hlaváč
 */

import Moment from 'moment';
import CP from 'counterpart';
import Hammer from 'hammerjs';

import Controls from './Controls.component';
import Timetable from './Timetable.component';
import DataCache from '../modules/DataCache.module';
import FunctionsSidebar from './FunctionsSidebar.component';
import Spinner from './Spinner.component';
import Error from './Error.component';

export default class Fittable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        // Set initial states
        this.state = {
            viewDate: new Moment().startOf( 'isoweek' ),
            prevViewDate: new Moment().startOf( 'isoweek' ),
            layout: 'horizontal',
            selectedDay: new Moment().isoWeekday() - 1,
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
            functionOpened: null,
            waiting: false,
            options: this.props,
            searchResults: [],
            error: false,
            errorType: null,
            mutedError: false
        };

        // Declare variables
        this.weekEvents = null;
        this.hammer = null;

        // Checks if required callbacks are set
        if ( typeof this.props.callbacks.data == 'undefined' )
            alert( 'You haven\'t set the data callback!' );

        // Force a refresh every one minute
        setInterval( this.handleRefreshNeed.bind( this ), 60000 );

        // Initial call of dateChange callback
        if ( 'dateChange' in this.props.callbacks )
        {
            this.props.callbacks.dateChange( this.state.viewDate.toISOString(), this.getSemester( this.state.viewDate ) );
        }
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
            this.props.callbacks.data( dateFrom, dateTo, this.setWeekEvents.bind( this ) );
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
        // Animate in correct direction
        if ( 'timetable' in this.refs )
            if ( this.state.prevViewDate.isAfter( this.state.viewDate ) )
                this.refs.timetable.animateRight();
            else
                this.refs.timetable.animateLeft();

        // Cache data if needed
        if ( ! alreadyCached )
        {
            var dateFrom = this.state.viewDate.toISOString();
            var dateTo = new Moment( this.state.viewDate ).endOf( 'isoweek' ).toISOString();
            DataCache.cacheData( dateFrom, dateTo, data );
        }

        // Set the data into state
        if ( Fittable.areDataValid( data ) )
            this.setState( { weekEvents: data, waiting: false, prevViewDate: this.state.viewDate } );
        else
        {
            alert( 'Data invalid!' );
            this.setState( { waiting: false, prevViewDate: this.state.viewDate } );
        } // todo: alert through UI

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

    search( query )
    {
        this.setState( { waiting: true } );

        if ( 'search' in this.props.callbacks )
        {
            this.props.callbacks.search( query, this.receiveSearchResults.bind( this ) );
        }
        else
        {
            alert( 'Search callback hasn\'t been defined.' );
            // todo: do not alert, show UI error
        }
    }

    refresh()
    {
        this.getWeekEvents();
    }

    /**
     * Sets error flag and displays error message. The widget will not work anymore, needs reload or calling
     * the muteError method
     * @param errorType Type of error. Default is 'generic'
     */
    onError( errorType )
    {
        this.setState( {
            error: true,
            errorType: errorType
        } );
    }

    /**
     * Mutes displayed error
     */
    muteError()
    {
        this.setState( {
            error: false,
            mutedError: true
        } );
    }

    receiveSearchResults( data )
    {
        this.setState( { searchResults: data, waiting: false } );
    }

    /**
     * Gets actual semester name, determined from actual viewDate state.
     * @returns {string} Semester name
     */
    getSemester( viewDate )
    {
        var semestername;
        if ( viewDate.month() < 2 )
            semestername = CP.translate( 'winter_sem', { year: ( parseInt( viewDate.format( 'YYYY' ) ) - 1 ) + '/' + viewDate.format( 'YY' ) } );
        else if ( viewDate.month() < 10 )
            semestername = CP.translate( 'summer_sem', { year: ( parseInt( viewDate.format( 'YYYY' ) ) - 1 ) + '/' + viewDate.format( 'YY' ) } );
        else
            semestername = CP.translate( 'winter_sem', { year: ( viewDate.format( 'YYYY' ) ) + '/' + new Moment( viewDate ).add( 1, 'year' ).format( 'YY' ) } );

        return semestername;
    }

    /**
     * Changes view date to specified moment. The moment should be the beginning of the week.
     * @param {Moment} viewDate New view date
     */
    handleChangeViewDate( viewDate )
    {
        // Update viewDate
        var newdate = new Moment( viewDate );

        // Hide until the request isn't done
        this.refs.timetable.hide();

        // Update the viewDate state
        this.setState( { viewDate: newdate, waiting: true } );

        // Send new date through callback
        if ( 'dateChange' in this.props.callbacks )
        {
            this.props.callbacks.dateChange( newdate.toISOString(), this.getSemester( newdate ) );
        }

        // Update the data
        this.getWeekEvents();
    }

    /**
     * Change active selected day relatively by argument. Used for displaying single day on mobile devices.
     * @param {int} by relative change
     */
    handleChangeSelectedDay( by )
    {
        var selection = this.state.selectedDay + by;

        if ( selection > 6 )
        {
            selection -= 7;
            this.handleChangeViewDate( this.state.viewDate.add( 1, 'week' ) );
        }

        if ( selection < 0 )
        {
            selection += 7;
            this.handleChangeViewDate( this.state.viewDate.subtract( 1, 'week' ) );
        }

        this.setState( { selectedDay : selection } );
    }

    /**
     * Handler for settings changing event.
     * @param {string} key option key
     * @param {string} to new setting
     */
    handleChangeSetting( key, to )
    {
        var newOptions = this.state.options;
        newOptions[key] = to;

        this.setState( { options: newOptions } );
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

    handleChangeView( to, param )
    {
        if ( typeof this.props.callbacks.viewChange == 'undefined' )
            alert( 'You haven\'t set the view changing callback!' );

        this.props.callbacks.viewChange( to, param );
    }

    /**
     * Hangs a listener on whole fittable element, that listens to swipe touch events.
     * @param el Element to be listened on
     */
    registerSwipeListener( el )
    {
        this.hammer = new Hammer( el );

        this.hammer.on( 'swipe', function( e )
        {
            if ( window.innerWidth <= 768 ) this.handleChangeSelectedDay( e.velocityX > 0 ? 1 : -1 );
        }.bind( this ) );
    }

    /**
     * Cancel all hammer listeners
     */
    unregisterSwipeListener()
    {
        this.hammer.destroy();
    }

    componentWillMount()
    {
        // Get week events
        this.getWeekEvents();
    }

    /**
     * Component mounting
     */
    componentDidMount()
    {
        this.registerSwipeListener( this.refs.rootEl.getDOMNode() );
    }

    /**
     * Component unmounting
     */
    componentWillUnmount()
    {
        this.unregisterSwipeListener();
    }

    /**
     * Renders the component
     */
    render()
    {
        if ( ! this.state.error )
        {
            return <div className="fittable-container" ref="rootEl">

                <Error muted={true} shown={this.state.mutedError} type={this.state.errorType} />

                <Controls viewDate={this.state.viewDate} onWeekChange={this.handleChangeViewDate.bind( this )}
                    onDateChange={this.handleChangeViewDate.bind( this )} semester={this.getSemester( this.state.viewDate )}
                    onSettingsPanelChange={this.handleChangeSettingsPanel.bind( this )}
                    onSelDayChange={this.handleChangeSelectedDay.bind( this )} selectedDay={this.state.selectedDay} />

                <div className="clearfix"></div>

                <FunctionsSidebar ref="sidebar" opened={this.state.functionOpened} displayFilter={this.state.displayFilter}
                    onFilterChange={this.handleChangeFilter.bind( this )} onSettingChange={this.handleChangeSetting.bind( this )}
                    onRefreshNeed={this.handleRefreshNeed.bind( this )} options={this.state.options}
                    onViewChange={this.handleChangeView.bind( this )}
                    onSearch={this.search.bind( this )} searchResults={this.state.searchResults} />

                <Timetable grid={this.state.grid} viewDate={this.state.viewDate} layout={this.state.options.layout}
                    weekEvents={this.state.weekEvents} displayFilter={this.state.displayFilter}
                    functionsOpened={this.state.functionOpened} selectedDay={this.state.selectedDay}
                    onViewChange={this.handleChangeView.bind( this )}
                    colored={this.state.options.colors} days7={this.state.options.days7} ref="timetable" />

                <Spinner show={this.state.waiting} />

            </div>;
        }
        else
        {
            return <div className="fittable-container" ref="rootEl">
                <Error type={this.state.errorType} onMute={this.muteError.bind(this)} />
            </div>;
        }
    }
}

Fittable.defaultProps = { callbacks: null, locale: 'en', layout: 'horizontal', colors: false, days7: false };
