/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';
import Moment from 'moment';
import { curry } from 'curry-d';

export default class EventDetail extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    handleCourseClick( course, e )
    {
        e.preventDefault();
        this.props.onViewChange( 'course', course );
    }

    handleTeacherClick( props, teacher, e )
    {
        e.preventDefault();
        props.onViewChange( 'person', teacher );
    }

    handleRoomClick( room, e )
    {
        e.preventDefault();
        this.props.onViewChange( 'room', room );
    }

    gotoDate( date, e )
    {
        e.preventDefault();
        this.props.showDetailOn( -1 );
        this.props.onDateChange( new Moment( date ) );
    }

    displayTeacher( props, username )
    {
        var teacherName = props.linkNames[CP.getLocale()]['teachers'][username];
        if ( typeof teacherName == 'undefined' ) teacherName = username;

        // FIXME: button should be a calendar icon, not teacher's name
        return <div className="teacher" key={username}>
            <button type="button" onClick={ curry(this.handleTeacherClick, 3)(props, username) }>
                <div className="full-name">{teacherName}</div>
            </button>
            <div className="contact">
                <a href={'https://usermap.cvut.cz/profile/' + username }>{username}</a>
            </div>
        </div>;
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
                        <button type="button" onClick={this.handleRoomClick.bind(this, this.props.data.room)}>
                            {this.props.data.room}
                        </button>
                        <i className="fa fa-map-marker fa-fw"></i>
                    </div>
                </div>
                <div className="row properties">
                    <div className="column small-6" title={CP.translate( 'detail.parallel' )}>
                        <i className="fa fa-thumb-tack fa-fw"></i>
                        {CP.translate( 'detail.number', { num: this.props.data.details.parallel} )}
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
                        </strong><br />
                            {CP.translate( 'detail.replacement' )} <br /> <a href="#" onClick={this.gotoDate.bind(this, this.props.data.replacedBy)}>{new Moment(this.props.data.replacedBy).format('LLL')}</a>
                        <hr />
                    </div>
                </div>
                <div className={'row replacement' + ( this.props.data.replacement ? '' : ' hide')}>
                    <div className="column small-12">
                        <strong>
                            <i className="fa fa-umbrella fa-fw"></i> {CP.translate( 'detail.replaces' )} <a href="#" onClick={this.gotoDate.bind(this, this.props.data.replaces)}>{new Moment(this.props.data.replaces).format('LLL')}</a>
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
                        { this.props.data.teachers.map( uname => this.displayTeacher(this.props, uname) ) }
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>;
    }
}
