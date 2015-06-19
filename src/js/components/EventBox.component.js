/**
 * Component representing the event.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';
import Moment from 'moment';

import EventDetail from './EventDetail.component';

export default class EventBox extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
        this.state = {
            detailShown: false
        };
    }

    /**
     * Renders the component
     */
    render()
    {
        // Generate time strings
        var startsAt = new Moment( this.props.data.startsAt ).format( 'LT' ),
            endsAt = new Moment( this.props.data.endsAt ).format( 'LT' );

        var appear = this.props.data.appear;

        // Determine amount of needed minimalization of text elements in box by its length
        var minimalization = "";
        if ( this.props.data._draw_length <= 0.12 ) minimalization = " min-light";
        if ( this.props.data._draw_length <= 0.10 ) minimalization = " min-hard";
        if ( this.props.data._draw_length <= 0.07 ) minimalization = " min-all";

        return <div className={ 'event' + ( this.props.detailShown ? ' detail-shown' : '' ) +
        ( this.props.data.cancelled ? ' cancelled' : '' ) + ( this.props.openFromBottom ? ' from-bottom' : '' )
        + ( this.props.data.replacement ? ' replacement ' : ' ' ) + appear + minimalization
        + ( this.props.colored ? ' color-' + this.props.data.type : '' )} data-event={this.props.data.id}
            style={{ width: this.props.data._draw_length*100 + "%", height: this.props.data._draw_length*100 + "%", left: this.props.data._draw_position*100 + "%", top: this.props.data._draw_position*100 + "%" }}>
            <div className="inner">
                <div className="head-space" onClick={this.props.onClick.bind(null, appear == 'hide' ? -1 : this.props.data.id)}></div>
                <div className="name">{this.props.data.name}</div>
                <div className="time">{startsAt} - {endsAt}</div>
                <div className="type">
                    <span className={'short' + ( this.props.colored ? ' hide' : '')}>{CP.translate( 'event_type_short.' + this.props.data.type )}</span>
                    <span className="long">{CP.translate( 'event_type.' + this.props.data.type )}</span>
                </div>
                <EventDetail ref="detail" data={this.props.data} onViewChange={this.props.onViewChange} />
                <div className="cancelflag"><i className="fa fa-ban"></i></div>
                <div className="replaceflag"><i className="fa fa-umbrella"></i></div>
            </div>
        </div>;
    }
}

EventBox.defaultProps = { detailShown: false };
