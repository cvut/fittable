/**
 * React component
 * @author Marián
 */

export default class FunctionsBar extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="functions-bar">
            <a href="#" className="flags-function"><i className="fa fa-flag"></i></a>
            <a href="#" className="search-function"><i className="fa fa-search"></i></a>
        </div>;
    }
}
