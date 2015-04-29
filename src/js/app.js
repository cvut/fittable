/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 *
 *  @author Marián Hlaváč
 */

import Fittable from './components/fittable.component';

global.fittable = function ( containerElId, dataCallback )
{
    // Render Fittable!
    var element = React.createElement( Fittable, { dataCallback: dataCallback } );
    React.render( element, document.getElementById( containerElId ) );
    return element;
};
