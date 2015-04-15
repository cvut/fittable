/**
 * @class Controls
 * @brief Class for manipulation with controls elements at top
 */

import Locale from './locale.module.js';

export default class Controls
{
    constructor( fittable )
    {
        this.fittable = fittable;
        this.defaultControlsClassNames = {
            root: 'header',
            week: 'week',
            weekSwitching: 'week-switching',
            dateSelector: 'date-selector',
            flagsSelector: 'flags-selector',
            functionsLinks: 'functions-links'
        };
        this.DOMelement = this.fittable.DOMelement.getElementsByClassName( this.defaultControlsClassNames.root )[0];

        // Find all control elements in there
        this.week = this.DOMelement.getElementsByClassName( this.defaultControlsClassNames.week )[0];
        this.weekSwitching = this.DOMelement.getElementsByClassName( this.defaultControlsClassNames.weekSwitching )[0];
    }

    refresh()
    {
        // Refresh week number
        this.week.getElementsByClassName( 'week-text' )[0].innerHTML = Locale.l( 'week' ) + ' ' + this.fittable.activeWeek;
        this.week.getElementsByClassName( 'week-parity-text' )[0].innerHTML = (
            this.fittable.activeWeek % 2 == 1 ? Locale.l( 'odd' ) : Locale.l( 'even' )
        );
    }

}
