/**
 * Indicator showing line representing actual point of today's time
 * @author Marián Hlaváč
 */

import Moment from '../../../bower_components/moment/moment.js';

export default class Timetable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Renders the component
     */
    render()
    {
        var nowpoint = new Moment().diff( new Moment().hour( this.props.timelineStartHour ) );
        var length = nowpoint / this.props.timelineLength;

        var shown = this.props.viewDate.isSame( new Moment(), 'week' ) && length > 0;

        if ( this.props.closestEvent !== null )
            return <div className={'now-indicator' + ( shown ? '' : ' hide')} ref="rootEl" style={{ width: length + '%' }}>
                <div className="next">{this.props.closestEvent.name} {new Moment( this.props.closestEvent.startsAt ).fromNow()}</div>
                <i className="fa fa-chevron-circle-right"></i>
            </div>;
        else
            return <div className={'now-indicator' + ( shown ? '' : ' hide')} ref="rootEl" style={{ width: length + '%' }}>
                <div className="next"></div>
                <i className="fa fa-chevron-circle-right"></i>
            </div>;
    }
}
