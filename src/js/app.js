/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 *
 *  @author Marián Hlaváč
 */

import Fittable from './components/fittable.component';

global.fittable = function ( containerElId, dataCallback )
{
    // Create root fittable element
    var element = React.createElement( Fittable, { dataCallback: dataCallback } );
    React.render( element, document.getElementById( containerElId ) );

    // Return it, make it global
    return element;
};
