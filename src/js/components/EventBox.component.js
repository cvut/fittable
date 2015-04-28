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

    handleShowDetail( e )
    {
        this.setState( { detailShown: !this.state.detailShown } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className={ 'event ' + ( this.state.detailShown ? 'detail-shown' : '' ) } data-event="{this.props.data.id}" style={{width:"14.63%", left: Math.floor( this.props.data.starts / 864 ) + "%"}}>
            <div className="inner" onClick={this.handleShowDetail.bind( this )}>
                <div className="name">{this.props.data.name}</div>
                <div className="time">{this.props.data.room}</div>
                <div className="type">{this.props.data.type}</div>
                <EventDetail ref="detail" />
            </div>
        </div>;
    }
}
