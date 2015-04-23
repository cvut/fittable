/**
 * React component
 * @author Marián
 */

import Day from './Day.component';

export default class Timetable extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="table">
            <div className="grid-overlay"><div className="grid"></div></div>
            <Day id="0" />
            <Day id="1" />
            <Day id="2" />
            <Day id="3" />
            <Day id="4" />
        </div>;
    }
}
