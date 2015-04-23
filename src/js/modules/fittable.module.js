/**
 * @class
 * @classdesc Main fittable class
 */

import Container from '../components/Container.component';

export default class Fittable
{
    constructor( elementName )
    {
        this.containerElementName = elementName;

        // Render Fittable!
        React.render( React.createElement( Container, { number: 0 } ), document.getElementById( this.containerElementName ) );
    }
}


