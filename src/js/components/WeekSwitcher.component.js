/**
 * React component
 * @author Marián
 */

import Toggleable from './Toggleable.component';
import Moment from '../../../bower_components/moment/moment.js';

export default class WeekSwitcher extends Toggleable
{
    /**
     * Renders the component
     */
    render()
    {
        var weeks = [ [], [], [], [], [], [], [] ], moments = [ [], [], [], [], [], [], [] ];
        var monthEnd = new Moment( this.props.viewDate ).endOf( 'month' ).endOf( 'isoWeek' );
        var weeki = 0, activeWeekIdx = -1;

        // Create weeks of month array
        for ( var i = new Moment( this.props.viewDate ).startOf( 'month' ).startOf( 'isoWeek' ); i.isBefore( monthEnd ); i.add( 1, 'day' ) )
        {
            weeks[ weeki ].push( i.date() );
            if ( i.isoWeekday() == 7 )
            {
                moments[ weeki ] = new Moment( i ).startOf( 'isoWeek' );
                weeki++;
            }
            if ( i.isSame( this.props.viewDate, 'week' ) ) activeWeekIdx = weeki;
        }

        // Set a semester name
        var semestername;
        if ( this.props.viewDate.month() < 2 )
            semestername = ( parseInt( this.props.viewDate.format( 'YYYY' ) ) - 1 ) + '/' + this.props.viewDate.format( 'YY' ) + ' Zimní';
        else if ( this.props.viewDate.month() < 10 )
            semestername = ( parseInt( this.props.viewDate.format( 'YYYY' ) ) - 1 ) + '/' + this.props.viewDate.format( 'YY' ) + ' Letní';
        else
            semestername = ( this.props.viewDate.format( 'YYYY' ) ) + '/' + new Moment( this.props.viewDate ).add( 1, 'year' ).format( 'YY' ) + ' Zimní';

        return <div className="week-switcher hide" ref="rootEl">
            <div className="row selector semester-selector">
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).subtract( 6, 'months' ), null )}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                    {semestername}
                </div>
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).add( 6, 'months' ), null )}><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            <div className="row selector month-selector">
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).subtract( 1, 'months' ), null )}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                    {this.props.viewDate.format( 'MMMM' )}
                </div>
                <div className="column small-3 gr-go">
                    <a href="#" onClick={this.props.onDateChange.bind( this, new Moment( this.props.viewDate ).add( 1, 'months' ), null )}><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            {weeks.map( function( week ) {
                return <div className={'row selector week-selector' + ( activeWeekIdx == weeks.indexOf( week ) ? ' active-week' : '' ) } key={weeks.indexOf( week )}>
                    <div className="column small-12">
                        <a href="#" onClick={this.props.onDateChange.bind( this, moments[ weeks.indexOf( week ) ] )}>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[0] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[0] < 7) ? ' in-other' : '')}>{week[0]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[1] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[1] < 7) ? ' in-other' : '')}>{week[1]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[2] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[2] < 7) ? ' in-other' : '')}>{week[2]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[3] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[3] < 7) ? ' in-other' : '')}>{week[3]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[4] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[4] < 7) ? ' in-other' : '')}>{week[4]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[5] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[5] < 7) ? ' in-other' : '')}>{week[5]}</div>
                            <div className={'day' + ((weeks.indexOf( week ) == 0 && week[6] > 7 )||(weeks.indexOf( week ) == weeki-1 && week[6] < 7) ? ' in-other' : '')}>{week[6]}</div>
                        </a>
                    </div>
                </div>;
            }.bind( this ) ) }

        </div>;
    }
}
