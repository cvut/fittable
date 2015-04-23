/**
 * React component
 * @author Marián
 */

export default class Week extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="week">
            <a href="#" className="date-selection">
                <strong className="week-text">Týden {'!?'}</strong>
                <span className="week-parity-text">{'!?'}</span>
                <i className="fa fa-caret-down"></i>
            </a>
        </div>;
    }
}
