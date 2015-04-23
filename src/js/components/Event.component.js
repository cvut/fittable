/**
 * React component
 * @author Marián
 */

export default class Event extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="event" data-event="3215456" style="width:14.63%;left:25.2%">
            <div className="inner">
                <div className="name">BI-PA2</div>
                <div className="time">12:45-14:15</div>
                <div className="type">CV</div>
            </div>
        </div>;
    }
}
