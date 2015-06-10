/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import CP from '../../../node_modules/counterpart/index.js';

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
                <div className="column small-6" title={CP.translate( 'detail.parallel' )}><i className="fa fa-thumb-tack fa-fw"></i> {CP.translate( 'detail.number', { num: this.props.data.details.parallel} )}</div>
                <div className="column small-6 text-right" title={CP.translate( 'detail.teacher' )}>{this.props.data.details.teacher} <i className="fa fa-male fa-fw"></i></div>
            </div>
            <div className="row properties">
                <div className="column small-6" title={CP.translate( 'detail.students' )}><i className="fa fa-group fa-fw"></i> {CP.translate( 'detail.students_count', { count: this.props.data.details.students.length } )}</div>
                <div className="column small-6 text-right" title={CP.translate( 'detail.room' )}>{this.props.data.room} <i className="fa fa-map-marker fa-fw"></i></div>
            </div>
            <hr />
            <div className={'row cancellation' + ( this.props.data.cancelled ? '' : ' hide')}>
                <div className="column small-12">
                    <strong><i className="fa fa-ban fa-fw"></i> {CP.translate( 'detail.cancelled' )}</strong>
                    <hr />
                </div>
            </div>
            <div className={'row replacement' + ( this.props.data.replacement ? '' : ' hide')}>
                <div className="column small-12">
                    <strong><i className="fa fa-umbrella fa-fw"></i> {CP.translate( 'detail.replacement', { date: 'N/A' } )} </strong>
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
