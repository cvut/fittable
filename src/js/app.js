/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 *
 *  @author Marián Hlaváč
 */

import Fittable from './components/fittable.component';

global.fittable = function ( containerElId )
{
    // Render Fittable!
    React.render( React.createElement( Fittable ), document.getElementById( containerElId ) );
}
