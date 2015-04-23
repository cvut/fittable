/**
 * React component
 * @author Marián
 */

export default class Day extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="day" data-day="{this.props.id}">
            <div className="label"><span className="day-name">!dayname</span></div>
            <div className="events">
                Events goes here
            </div>
        </div>;
    }
}
