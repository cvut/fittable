/**
 * React component
 * @author Marián
 */

import EventBox from './EventBox.component';

export default class Day extends React.Component
{
    construtor( props )
    {
        super.constructor( props );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="day" data-day="{this.props.id}">
            <div className="label"><span className="day-name">!dayname</span></div>
            <div className="events">
                {this.props.events.map( function( event ) {
                    return <EventBox key={event.id} data={event} />;
                } ) }
            </div>
        </div>;
    }
}
