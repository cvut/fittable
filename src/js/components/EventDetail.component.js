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
        Number.prototype.pad = function(size) {
            var s = String(this);
            while (s.length < (size || 2)) {s = "0" + s;}
            return s;
        };

        var startTime = this.props.data.startsAt.getHours() + ":" + this.props.data.startsAt.getMinutes().pad(2);
        var endTime = this.props.data.endsAt.getHours() + ":" + this.props.data.endsAt.getMinutes().pad(2);

        return <div className="detail">
            <div className="row properties">
                <div className="column small-6"><i className="fa fa-thumb-tack fa-fw"></i> č. {this.props.data.details.parallel}</div>
                <div className="column small-6 text-right">{this.props.data.details.teacher} <i className="fa fa-male fa-fw"></i></div>
            </div>
            <div className="row properties">
                <div className="column small-6"><i className="fa fa-group fa-fw"></i> <a href="#"> {this.props.data.details.students.length} studentů </a></div>
                <div className="column small-6 text-right">{this.props.data.details.capacity} <i className="fa fa-pie-chart fa-fw"></i></div>
            </div>
            <hr />
            <div className="row">
                <div className="column small-12">
                    <strong>{this.props.data.note}</strong>
                    <div className="description">
                        {this.props.data.details.description}
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>;
    }
}
