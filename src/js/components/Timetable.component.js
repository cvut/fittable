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
    /**
     * Renders the component
     */
    render()
    {
        var weekEvents = [ [], [], [], [], [], [], [] ];
        for ( var event of this.props.weekEvents )
            weekEvents[ event.day ].push( event );

        return <div className="table">
            <div className="grid-overlay"><div className="grid"></div></div>
            <Day id="0" events={weekEvents[0]} />
            <Day id="1" events={weekEvents[1]} />
            <Day id="2" events={weekEvents[2]} />
            <Day id="3" events={weekEvents[3]} />
            <Day id="4" events={weekEvents[4]} />
        </div>;
    }
}
