/**
 * React component
 * @author Marián
 */

export default class WeekNav extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="week-nav">
            <a href="#" className="previous-week"><i className="fa fa-chevron-left"></i></a>
            <a href="#" className="next-week"><i className="fa fa-chevron-right"></i></a>
        </div>;
    }
}
