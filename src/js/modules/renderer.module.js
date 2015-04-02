/**
 * @class Renderer
 * @brief nah
 */

export default class renderer
{
    constructor()
    {
        this.templateFile = 'template/template.html';
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
    render( element )
    {
        this.loadTemplate( ( template ) =>
            {
                if ( element != null )
                    element.outerHTML = template;
                else
                    throw 'Element for rendering not found. Render aborted.';
            }
        );
    }

}
