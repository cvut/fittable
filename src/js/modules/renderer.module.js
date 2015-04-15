/**
 * @class Renderer
 * @brief nah
 */

export default class Renderer
{
    constructor( fittable )
    {
        this.templateFile = 'tpl.html';
        this.fittable = fittable;
    }

    /**
     * Makes HTTP request and returns main HTML template
     * @param {function} callback - called after success http response
     */
    loadTemplate( callback )
    {
        var tplReq = new XMLHttpRequest();

        tplReq.open( 'get', this.templateFile, true );
        tplReq.onload = () => {
            callback( tplReq.response );
        };
        tplReq.send();
    }


    /**
     * Renders fittable
     */
    render()
    {
        // Render basic HTML template
        this.loadTemplate( ( template ) =>
            {
                if ( this.fittable.DOMelement != null )
                {
                    this.fittable.DOMelement.innerHTML = template;
                    this.fittable.DOMelement.setAttribute( 'data-js-generated', '' );
                    this.fittable.DOMelement.className = 'fittable-container horizontal one-colored';
                }
                else
                    throw 'Element for rendering not found. Render aborted.';

                // Render week
                var tableElement = this.fittable.DOMelement.getElementsByClassName( 'table' )[0];
                var weeksElements = this.fittable.getActiveWeek().render();

                for ( var week in weeksElements )
                    tableElement.appendChild( weeksElements[ week ] );
            }
        );
    }

}
