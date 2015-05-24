/**
 * React component
 * @author Marián
 */

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
     * Returns short name of event type, if transformation exists, otherwise
     * returns original type string.
     * @param {string} type
     * @returns {string} shorter event type name
     */
    getEventTypeName( type )
    {
        var eventTypes = {
            "laboratory": "lab",
            "tutorial": "cvi",
            "lecture": "pře",
            "exam": "zk"
        };

        return type in eventTypes ? eventTypes[ type ] : type;
    }

    /**
     * Handler for events, when event box is clicked, and the
     * EventDetail component should be displayed
     * @param e event
     */
    handleShowDetail( e )
    {
        this.setState( { detailShown: !this.state.detailShown } );
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

        var appear = this.props.data.appear;
        var startTime = this.props.data.startsAt.getHours() + ":" + this.props.data.startsAt.getMinutes().pad(2);
        var endTime = this.props.data.endsAt.getHours() + ":" + this.props.data.endsAt.getMinutes().pad(2);

        // Determine amount of needed minimalization of text elements in box
        var minimalization = "";
        if ( this.props.data._draw_length <= 0.12 ) minimalization = " min-light";
        if ( this.props.data._draw_length <= 0.10 ) minimalization = " min-hard";
        if ( this.props.data._draw_length <= 0.07 ) minimalization = " min-all";

        return <div className={ 'event' + ( this.state.detailShown ? ' detail-shown' : '' ) + ' ' + appear + minimalization } data-event="{this.props.data.id}"
            style={{ width: this.props.data._draw_length*100 + "%", height: this.props.data._draw_length*100 + "%", left: this.props.data._draw_position*100 + "%", top: this.props.data._draw_position*100 + "%" }}>
            <div className="inner" onClick={this.handleShowDetail.bind( this )}>
                <div className="name">{this.props.data.name}</div>
                <div className="time">{startTime} - {endTime}</div>
                <div className="type">{this.getEventTypeName( this.props.data.type )}</div>
                <EventDetail ref="detail" data={this.props.data} />
            </div>
        </div>;
    }
}
