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

    style(props) {
        var length = `${props.data._draw_length*100}%`;
        var position = `${props.data._draw_position*100}%`;
        return {
            width: length,
            height: length,
            left: position,
            top: position,
        };
    }

    minimalization(drawLength) {
        // Determine amount of needed minimalization of text elements in box by its length
        if ( drawLength <= 0.12 ) {
            return 'min-light';
        }
        if ( drawLength <= 0.10 ) {
            return 'min-hard';
        }
        if ( drawLength <= 0.07 ) {
            return 'min-all';
        }
    }

    classNames(props) {
        let cls = ['event', props.data.appear, this.minimalization(props.data._draw_length)];
        if (props.detailShown) {
            cls.push('detail-shown');
        }
        if (props.data.cancelled) {
            cls.push('cancelled');
        }
        if (props.openFromBottom) {
            cls.push('from-bottom');
        }
        if (props.data.replacement) {
            cls.push('replacement');
        }

        if(props.colored) {
            cls.push(`color-${props.data.type}`);
        }

        return cls.join(' ');
    }

    displayTime(props) {
        var startsAt = new Moment( this.props.data.startsAt ).format( 'LT' ),
            endsAt = new Moment( this.props.data.endsAt ).format( 'LT' );

        if(props.detailShown) {
            return `${startsAt}—${endsAt}`;
        }
        else {
            return `${startsAt}`;
        }
    }

    /**
     * Renders the component
     */
    render()
    {
        // Generate time strings

        var appear = this.props.data.appear;

        return <div className={this.classNames(this.props)} data-event={this.props.data.id} style={this.style(this.props)}>
            <div className="inner">
                <div className="head-space" onClick={this.props.onClick.bind(null, appear === 'hide' ? -1 : this.props.data.id)}></div>
                <div className="name">{this.props.data.course}</div>
                <div className="time">{this.displayTime(this.props)}</div>
                <div className="type">
                    <span className={'short' + ( this.props.colored ? ' hide' : '')}>{CP.translate( 'event_type_short.' + this.props.data.type )}</span>
                    <span className="long">{CP.translate( 'event_type.' + this.props.data.type )}</span>
                </div>
                <EventDetail ref="detail" data={this.props.data} onViewChange={this.props.onViewChange}
                    onDateChange={this.props.onDateChange} showDetailOn={this.props.onClick} linkNames={this.props.linkNames} />
                <div className="cancelflag"><i className="fa fa-ban"></i></div>
                <div className="replaceflag"><i className="fa fa-umbrella"></i></div>
            </div>
        </div>;
    }
}

EventBox.defaultProps = { detailShown: false };
