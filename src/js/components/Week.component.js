/**
 * React component
 * @author Marián
 */

export default class Week extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="week">
            <a href="#" className="date-selection">
                <strong className="week-text">Týden {this.props.week}&nbsp;&nbsp;</strong>
                <span className="week-parity-text">{this.props.week % 2 == 0 ? 'sudý' : 'lichý'}</span>
                <i className="fa fa-caret-down"></i>
            </a>
        </div>;
    }
}
