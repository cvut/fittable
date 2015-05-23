/**
 * React component
 * @author Marián
 */

export default class Toggleable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    toggle()
    {
        if ( ! this.refs.rootEl.getDOMNode().classList.contains( 'hide' ) )
            this.refs.rootEl.getDOMNode().classList.add( 'hide' );
        else
            this.refs.rootEl.getDOMNode().classList.remove( 'hide' );
    }

    show()
    {
        this.refs.rootEl.getDOMNode().classList.remove( 'hide' );
    }

    hide()
    {
        if ( ! this.refs.rootEl.getDOMNode().classList.contains( 'hide' ) )
            this.refs.rootEl.getDOMNode().classList.add( 'hide' );
    }
}
