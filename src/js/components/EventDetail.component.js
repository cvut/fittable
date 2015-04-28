/**
 * React component
 * @author Marián
 */

export default class EventDetail extends React.Component
{

    /**
     * Renders the component
     */
    render()
    {
        return <div className="detail">
            <div className="row">
                <div className="column small-6">Info</div>
                <div className="column small-6">Info</div>
            </div>
            <div className="row">
                <div className="column small-6">Info</div>
                <div className="column small-6">Next Info</div>
            </div>
            <div className="row">
                <div className="column small-12">All Info</div>
            </div>
        </div>;
    }
}
