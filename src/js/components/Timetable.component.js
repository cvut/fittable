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

    animateLeft()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-left"); }, 50 );
    }

    animateRight()
    {
        var rootEl = this.refs.rootEl.getDOMNode();

        // Replay CSS animation
        rootEl.classList.remove("a-left");
        rootEl.classList.remove("a-right");
        setTimeout( () => { rootEl.classList.add("a-right"); }, 50 );
    }

    /**
     * Renders the component
     */
    render()
    {
        var weekEvents = [ [], [], [], [], [], [], [] ];
        for ( var event of this.props.weekEvents )
            weekEvents[ event.day ].push( event );

        return <div className="table a-left" ref="rootEl">
            <div className="grid-overlay"><div className="grid"></div></div>
            <Day id="0" events={weekEvents[0]} />
            <Day id="1" events={weekEvents[1]} />
            <Day id="2" events={weekEvents[2]} />
            <Day id="3" events={weekEvents[3]} />
            <Day id="4" events={weekEvents[4]} />
        </div>;
    }
}
