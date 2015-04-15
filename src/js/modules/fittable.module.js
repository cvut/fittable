/**
 @module Fittable
 @brief I dunno yet
 */

import Renderer from './renderer.module.js';
import Week from './week.module.js';
import Controls from './controls.module.js';

export default class Fittable
{
    constructor( elementName )
    {
        this.defaultElementName = elementName;
        this.DOMelement = null;
        this.renderer = new Renderer( this );
        this.activeWeek = 42; // todo: get actual week
        this.weeks = [];
        this.controls = null;

        window.addEventListener( 'load', () =>
            {
                // Set DOMelement of fittable
                this.DOMelement = document.getElementById( this.defaultElementName );

                // Render controls after render
                this.renderer.afterRender = ( ftbl ) =>
                {
                    ftbl.controls = new Controls( ftbl );
                    ftbl.controls.refresh();
                };

                // Render it!
                this.renderer.render( this.DOMelement );
            }
        );
    }

    resetWeek( index )
    {
        this.weeks[ index ] = new Week( index );
    }

    week( index )
    {
        if ( index < 0 || index > 53 ) throw "Week index out of range.";
        if ( typeof this.weeks[ index ] == 'undefined' ) this.resetWeek( index );
        return this.weeks[ index ];
    }

    getActiveWeek()
    {
        if ( typeof this.weeks[ this.activeWeek ] == 'undefined' ) throw "Active week hasn't been initialized.";
        return this.weeks[ this.activeWeek ];
    }

    switchWeek( index )
    {
        if ( index < 0 || index > 53 ) throw "Week index out of range.";

    }
}


