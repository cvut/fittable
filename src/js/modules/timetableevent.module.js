/**
 * @class TimetableEvent
 * @brief class for instanting events
 */

export default class TimetableEvent
{
    constructor( id, name, note, startsAt, endsAt, parallelDetails = null )
    {
        this.id = id;
        this.name = name;
        this.note = note;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.parallelDetails = parallelDetails;
    }

    /**
     * Calculates HTML element width (in %)
     * @returns {string} Element width
     */
    calcElementWidth()
    {
        return '17.2%'; // todo
    }

    /**
     * Calculates HTML element position from the left (in %)
     * @returns {string} Element position
     */
    calcElementPosition()
    {
        return '0.0%'; // todo
    }

    /**
     * Renders the event's HTML element for inserting into the page
     * @returns {HTMLElement}
      */
    render()
    {
        // Outer element ( div.event )
        var evEl = document.createElement( 'div' );
        evEl.className = 'event';
        evEl.setAttribute( 'data-event', this.id );
        evEl.setAttribute( 'style', 'width: ' + this.calcElementWidth() + '; left: ' + this.calcElementPosition() + ';' );

        // Inner element ( div.event > div.inner )
        var inEl = document.createElement( 'div' );
        inEl.className = 'inner';
        evEl.appendChild( inEl );

        // Child elements
        var chEl = document.createElement( 'div' );
        chEl.className = 'name';
        chEl.appendChild( document.createTextNode( this.name ) );
        inEl.appendChild( chEl );

        chEl = document.createElement( 'div' );
        chEl.className = 'time';
        chEl.appendChild( document.createTextNode( '0:00 - 0:00' ) ); // todo
        inEl.appendChild( chEl );

        chEl = document.createElement( 'div' );
        chEl.className = 'type';
        chEl.appendChild( document.createTextNode( 'CV' ) ); // todo
        inEl.appendChild( chEl );

        return evEl;
    }

}
