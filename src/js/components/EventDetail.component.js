/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import CP from 'counterpart';

export default class EventDetail extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    handleParallelClick( course, e )
    {
        e.preventDefault();
        this.props.onViewChange( 'course', course );
    }

    handleTeacherClick( teacher, e )
    {
        e.preventDefault();
        this.props.onViewChange( 'person', teacher );
    }

    handleRoomClick( room, e )
    {
        e.preventDefault();
        this.props.onViewChange( 'room', room );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="detail">
            <div className="row properties">
                <div className="column small-6" title={CP.translate( 'detail.parallel' )}>
                    <i className="fa fa-thumb-tack fa-fw"></i>
                    <a href="#" onClick={this.handleParallelClick.bind(this, this.props.data.name)}>
                        {CP.translate( 'detail.number', { num: this.props.data.details.parallel} )}
                    </a>
                </div>
                <div className="column small-6 text-right" title={CP.translate( 'detail.teacher' )}>
                    <a href="#" onClick={this.handleTeacherClick.bind(this, this.props.data.details.teacher)}>
                        {this.props.data.details.teacher}
                    </a>
                    <i className="fa fa-male fa-fw"></i>
                </div>
            </div>
            <div className="row properties">
                <div className="column small-6" title={CP.translate( 'detail.students' )}>
                    <i className="fa fa-group fa-fw"></i>
                    {CP.translate( 'detail.students_count', { count: this.props.data.details.students.length } )}
                </div>
                <div className="column small-6 text-right" title={CP.translate( 'detail.room' )}>
                    <a href="#" onClick={this.handleRoomClick.bind(this, this.props.data.room)}>
                        {this.props.data.room}
                    </a>
                    <i className="fa fa-map-marker fa-fw"></i>
                </div>
            </div>
            <hr />
            <div className={'row cancellation' + ( this.props.data.cancelled ? '' : ' hide')}>
                <div className="column small-12">
                    <strong>
                        <i className="fa fa-ban fa-fw"></i> {CP.translate( 'detail.cancelled' )}
                    </strong>
                    <hr />
                </div>
            </div>
            <div className={'row replacement' + ( this.props.data.replacement ? '' : ' hide')}>
                <div className="column small-12">
                    <strong>
                        <i className="fa fa-umbrella fa-fw"></i> {CP.translate( 'detail.replacement', { date: 'N/A' } )}
                    </strong>
                    <hr />
                </div>
            </div>
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
