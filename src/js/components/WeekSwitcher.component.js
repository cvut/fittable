/**
 * React component
 * @author Marián
 */

import Toggleable from './Toggleable.component';

export default class WeekSwitcher extends Toggleable
{
    /**
     * Renders the component
     */
    render()
    {
        var weekStart = Date.fromWeeksUTC( this.props.week, this.props.year );
        var monthStart = new Date( Date.UTC( this.props.year, weekStart.getMonth(), 1 ) );
        var monthStartweekStart = new Date( Date.UTC( this.props.year, weekStart.getMonth(), ( monthStart.getDay() == 0 ? -5 : -monthStart.getDay() + 2  ) ) );

        var weeks = [];
        var nweek = new Date( monthStartweekStart );
        while ( nweek.getMonth() <= monthStart.getMonth() )
        {
            var wdays = [];
            wdays.push( [ nweek.getWeekNumber(), nweek.getFullYear() ] );
            for ( var i = 0; i < 7; i++ )
            {
                wdays.push( nweek.getDate() );
                nweek.setDate( nweek.getDate() + 1 );
            }
            weeks.push( wdays );
        }

        var yr = weekStart.getFullYear().toString().substr( 2, 2 );
        var smnth = weekStart.getMonth();
        var semestername = "B";
        var semesterseas;
        if ( smnth <= 1 ) { semestername += (yr - 1) + "1"; semesterseas = "ZIMNÍ"; }
        else if ( smnth <= 9 ) { semestername += (yr - 1) + "2"; semesterseas = "LETNÍ"; }
        else { semestername += (yr) + "1"; semesterseas = "ZIMNÍ"; }

        return <div className="week-switcher hide" ref="rootEl">
            <div className="row selector semester-selector">
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, this.props.week - 26, null )}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                    {semestername} {semesterseas}
                </div>
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, this.props.week + 26, null )}><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            <div className="row selector month-selector">
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, this.props.week - 4, null )}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                {weekStart.toLocaleFormat('%B')}
                </div>
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, this.props.week + 4, null )}><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            {weeks.map( function( week ) {
                return <div className={'row selector week-selector' + ( this.props.week == week[0][0] ? ' active-week' : '' ) } key={weeks.indexOf(week)}>
                    <div className="column small-12">
                        <a href="#" onClick={this.props.onDateChange.bind( this, week[0][0], week[0][1] )}>
                            <div className="day">{week[1]}</div>
                            <div className="day">{week[2]}</div>
                            <div className="day">{week[3]}</div>
                            <div className="day">{week[4]}</div>
                            <div className="day">{week[5]}</div>
                            <div className="day">{week[6]}</div>
                            <div className="day">{week[7]}</div>
                        </a>
                    </div>
                </div>;
            }.bind( this ) ) }

        </div>;
    }
}
