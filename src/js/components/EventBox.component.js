/**
 * React component
 * @author Marián
 */

export default class EventBox extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="event" data-event="{this.props.data.id}" style={{width:"14.63%", left: Math.random() * 90 + "%"}}>
            <div className="inner">
                <div className="name">{this.props.data.name}</div>
                <div className="time">{this.props.data.room}</div>
                <div className="type">{this.props.data.type}</div>
            </div>
        </div>;
    }
}
