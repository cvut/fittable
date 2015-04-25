/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 *
 *  @author Marián Hlaváč
 */

import Fittable from './components/fittable.component';

// Container element id ( used for drawing fittable )
var containerElId = "fittable";

// Render Fittable!
React.render( React.createElement( Fittable ), document.getElementById( containerElId ) );
