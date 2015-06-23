/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import React from 'react';
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
        var courseName = this.props.linkNames[CP.getLocale()]['courses'][this.props.data.course];
        if ( typeof courseName == 'undefined' ) courseName = this.props.data.course;

        return <div className="detail">
                <div className="wrap">
                <div className="row properties">
                    <div className="column small-6" title={CP.translate( 'detail.sequence' )}>
                        <i className="fa fa-calendar fa-fw"></i>
                        {this.props.data.sequenceNumber}. {CP.translate( 'event_type.' + this.props.data.type ).toLowerCase()}
                    </div>
                    <div className="column small-6 text-right" title={CP.translate( 'detail.room' )}>
                        <a href="#" onClick={this.handleRoomClick.bind(this, this.props.data.room)}>
                            {this.props.data.room}
                        </a>
                        <i className="fa fa-map-marker fa-fw"></i>
                    </div>
                </div>
                <div className="row properties">
                    <div className="column small-6" title={CP.translate( 'detail.parallel' )}>
                        <i className="fa fa-thumb-tack fa-fw"></i>
                        <a href="#" onClick={this.handleParallelClick.bind(this, this.props.data.name)}>
                            {CP.translate( 'detail.number', { num: this.props.data.details.parallel} )}
                        </a>
                    </div>
                    <div className="column small-6 text-right" title={CP.translate( 'detail.students' )}>
                        {CP.translate( 'detail.students_count', { count: this.props.data.details.students.length } )}
                        <i className="fa fa-group fa-fw"></i>
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
                        <strong>{this.props.data.name !== null ? this.props.data.name : courseName}</strong>
                        <div className="description">
                            {this.props.data.details.description}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row teachers" title={CP.translate( 'detail.teacher' )}>
                    <div className="column small-3 text-center">
                        <i className="fa fa-fw fa-street-view"></i>
                    </div>
                    <div className="column small-9">
                        {this.props.data.teachers.map( function( teacher ) {
                            var teacherName = this.props.linkNames[CP.getLocale()]['teachers'][teacher];
                            if ( typeof teacherName == 'undefined' ) teacherName = teacher;

                            return <div className="teacher" key={teacher}>
                                <div className="full-name">{teacherName}</div>
                                <div className="contact">
                                    <a href={'mailto:' + teacher + '@fit.cvut.cz'}>{teacher}@fit.cvut.cz</a><br />
                                    <a href={'https://usermap.cvut.cz/' + teacher }>usermap - {teacher}</a>
                                </div>
                            </div>;
                        }.bind(this) ) }
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>;
    }
}
