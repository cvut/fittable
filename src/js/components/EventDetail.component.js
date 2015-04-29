/**
 * React component
 * @author Marián
 */

export default class EventDetail extends React.Component
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
        return <div className="detail">
            <div className="row properties">
                <div className="column small-6"><i className="fa fa-thumb-tack fa-fw"></i> č. {this.props.details.parallel}</div>
                <div className="column small-6 text-right">{this.props.details.teacher} <i className="fa fa-male fa-fw"></i></div>
            </div>
            <div className="row properties">
                <div className="column small-6"><i className="fa fa-group fa-fw"></i> <a href="#"> {this.props.details.students.length} studentů </a></div>
                <div className="column small-6 text-right">{this.props.details.capacity} <i className="fa fa-pie-chart fa-fw"></i></div>
            </div>
            <hr />
            <div className="row">
                <div className="column small-12"><em>Info about this parallel goes here.</em></div>
            </div>
        </div>;
    }
}
