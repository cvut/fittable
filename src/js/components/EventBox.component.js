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
        return <div className={ 'event ' + ( this.state.detailShown ? 'detail-shown' : '' ) } data-event="{this.props.data.id}"
            style={{ width: this.props.data._draw_length*100 + "%", left: this.props.data._draw_position*100 + "%" }}>
            <div className="inner" onClick={this.handleShowDetail.bind( this )}>
                <div className="name">{this.props.data.name}</div>
                <div className="time">{this.props.data.room}</div>
                <div className="type">{this.props.data.type}</div>
                <EventDetail ref="detail" details={this.props.data.details} />
            </div>
        </div>;
    }
}
