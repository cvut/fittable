/**
 * Child component of EventBox, showing more information that won't fit into
 * EventBox. Shows after clicking on EventBox.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';
import Moment from 'moment';

export default class EventDetail extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    handleCourseClick( course )
    {
        this.props.onViewChange( 'course', course );
    }

    handleTeacherClick( teacher )
    {
        this.props.onViewChange( 'person', teacher );
    }

    handleRoomClick( room )
    {
        this.props.onViewChange( 'room', room );
    }

    gotoDate( date )
    {
        this.props.showDetailOn( -1 );
        this.props.onDateChange( new Moment( date ) );
    }

    getLinkName(type, key) {
        return this.props.linkNames[CP.getLocale()][type][key] || key;
    }

    revealTeachers( e )
    {
        var el = e.target.parentNode.getElementsByClassName( 'reveal' )[0];
        if ( el.classList.contains( 'hide' ) ) el.classList.remove( 'hide' ); else el.classList.add( 'hide' );
    }

    /**
     * Renders the component
     */
    render()
    {
        var courseName = this.getLinkName('courses', this.props.data.course);

        // Teachers objects
        var teachers = [];
        var teachersblock;

        // Exceptions objects
        var exceptions = [];

        // Teachers
        if ( this.props.data.teachers.length >= 3 )
        {
            teachersblock = <div className="row object course">
                <div className="column small-3 text-center type-icon">
                    <span className="type">{CP.translate( 'detail.teachers' )}</span>
                    <i className="fa fa-fw fa-street-view"></i>
                </div>
                <div className="column small-9">
                    <button className="button secondary tiny reveal-teachers" onClick={this.revealTeachers}><i className="fa fa-plus"></i> {CP.translate('detail.teachers_show', { count: this.props.data.teachers.length } )}</button>
                    <div className="reveal hide">
                    {this.props.data.teachers.map( function( teacher ) { return <div className="teacher">
                            <strong>{this.getLinkName('teachers', teacher)}</strong>
                            <div className="links">
                                <button className="button secondary tiny" onClick={this.handleTeacherClick.bind(this, teacher)}><i className="fa fa-calendar"></i> kalendář</button>
                                <a className="button secondary tiny" href={'https://usermap.cvut.cz/profile/' + teacher }><i className="fa fa-male"></i> usermap</a>
                            </div>
                        </div>; }.bind( this )
                    )}
                    </div>
                </div>
            </div>;
        }
        else if ( this.props.data.teachers.length > 0 )
        {
            teachersblock = <div className="row object course">
                <div className="column small-3 text-center type-icon">
                    <span className="type">{CP.translate( 'detail.teachers' )}</span>
                    <i className="fa fa-fw fa-street-view"></i>
                </div>
                <div className="column small-9">
                {this.props.data.teachers.map( function( teacher ) { return <div className="teacher">
                        <strong>{this.getLinkName('teachers', teacher)}</strong>
                        <div className="links">
                            <button className="button secondary tiny" onClick={this.handleTeacherClick.bind(this, teacher)}><i className="fa fa-calendar"></i> kalendář</button>
                            <a className="button secondary tiny" href={'https://usermap.cvut.cz/profile/' + teacher }><i className="fa fa-male"></i> usermap</a>
                        </div>
                    </div>; }.bind( this )
                )}
                </div>
            </div>;
        }
        if ( this.props.data.details.appliedExceptions )
        {
            for ( var exception of this.props.data.details.appliedExceptions )
            {
                exceptions.push( <div className="row object exception">
                    <div className="column small-3 text-center type-icon">
                        <span className="type">{CP.translate( 'detail.exception' )}</span>
                        <i className="fa fa-fw fa-bullhorn"></i>
                    </div>
                    <div className="column small-9">
                        <strong>{this.getLinkName('exceptions', exception)}</strong>
                    </div>
                </div> );
            }

            if ( this.props.data.details.appliedExceptions.length > 0 ) {
                exceptions.push( <hr /> );
            }
        }

        return <div className="detail">
                <div className="wrap">
                <div className="row properties">
                    <div className="column small-5" title={CP.translate( 'detail.room' )}>
                        <i className="fa fa-map-marker fa-fw"></i>
                        <button type="button" onClick={this.handleRoomClick.bind(this, this.props.data.room)}>
                            {this.props.data.room}
                        </button>
                    </div>
                    <div className="column small-7 text-right" title={CP.translate( 'detail.sequence' )}>
                        {this.props.data.sequenceNumber}. {CP.translate( 'event_type.' + this.props.data.type ).toLowerCase()}
                        <i className="fa fa-question-circle fa-fw"></i>
                    </div>
                </div>
                <div className="row properties">
                    <div className="column small-6" title={CP.translate( 'detail.students' )}>
                        <i className="fa fa-group fa-fw"></i>
                        {CP.translate( 'detail.students_count', { count: this.props.data.details.students.length } )}
                    </div>
                    <div className="column small-6 text-right" title={CP.translate( 'detail.parallel' )}>
                        {CP.translate( 'detail.number', { num: this.props.data.details.parallel} )}
                        <i className="fa fa-question-circle fa-fw"></i>
                    </div>
                </div>
                <hr />
                <div className={'row cancellation' + ( this.props.data.cancelled ? '' : ' hide')}>
                    <div className="column small-12">
                        <strong>
                            <i className="fa fa-ban fa-fw"></i> {CP.translate( 'detail.cancelled' )}
                        </strong><br />
                        <div className={ 'replacedBy' in this.props.data ? '' : 'hide' }>
                            {CP.translate( 'detail.replacement' )} <br /> <a href="#" onClick={this.gotoDate.bind(this, this.props.data.replacedBy)}>{new Moment(this.props.data.replacedBy).format('LLL')}</a>
                        </div>
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
                {exceptions.map( function( exception ) { return exception; } )}
                <div className="row object course">
                    <div className="column small-3 text-center type-icon">
                        <span className="type">{CP.translate( 'detail.course' )}</span>
                        <i className="fa fa-fw fa-question-circle"></i>
                    </div>
                    <div className="column small-9">
                        <strong>{courseName}</strong>

                        <div className="links">
                            <button className="button secondary tiny" onClick={this.handleCourseClick.bind(this, this.props.data.course)}><i className="fa fa-calendar"></i> kalendář</button>
                        </div>

                        <p className="description">
                            {this.props.data.details.description}
                        </p>
                    </div>
                </div>
                <hr />
                {teachersblock}
                <div className="clearfix"></div>
            </div>
        </div>;
    }
}
