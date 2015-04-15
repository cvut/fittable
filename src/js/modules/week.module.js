/**
 * @class Week
 * @brief ...
 */

import TimetableEvent from './timetableevent.module.js';
import Locale from './locale.module.js';

export default class Week
{
    constructor( number )
    {
        this.number = number;
        this.days = [ [], [], [], [], [], [], [] ];
        this.DOMelement = null;
    }

    /**
     * Adds new event into specified week
     * @param event Event object to be inserted
     * @param day Day where event will be inserted (0-6)
     * @returns {Week}
     */
    addEvent( event, day )
    {
        if ( event instanceof TimetableEvent )
        {
            if ( day >= 0 && day <= 6 )
            {
                this.days[ day ].push( event );
            }
            else throw "Day is out of week range.";
        }
        else throw "Specified object isn't instance of Event class";

        return this;
    }

    /**
     * Render all days, returns array of HTML elements
     * @returns {Array}
     */
    render()
    {
        var daysElements = [];

        // Render each day
        for ( var day in this.days )
        {
            var dyEl = document.createElement( 'div' );
            dyEl.className = 'day';
            dyEl.setAttribute( 'data-day', day );

            var lbEl = document.createElement( 'div' );
            lbEl.className = 'label';
            var lbEl2 = document.createElement( 'span' );
            lbEl2.className = 'day-name';
            lbEl2.appendChild( document.createTextNode( Locale.ll( 'day' + day ) ) );
            lbEl.appendChild( lbEl2 );

            dyEl.appendChild( lbEl );

            // Render all events from this day
            var evsEl = document.createElement( 'div' );
            evsEl.className = 'events';
            for ( var event in this.days[ day ] )
                evsEl.appendChild( this.days[ day ][ event ].render() );

            dyEl.appendChild( evsEl );

            daysElements.push( dyEl );
        }

        return daysElements;
    }
}
