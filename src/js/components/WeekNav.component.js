/**
 * React component
 * @author Marián
 */

export default class WeekNav extends React.Component
{
    handlePrevClick( e )
    {
        this.props.onPrevClick( e );
    }

    handleNextClick( e )
    {
        this.props.onNextClick( e );
    }
    /**
     * Renders the component
     */
    render()
    {
        return <div className="week-nav">
            <a href="#" className="previous-week" onClick={this.handlePrevClick.bind( this )}><i className="fa fa-chevron-left"></i></a>
            <a href="#" className="next-week" onClick={this.handleNextClick.bind( this )}><i className="fa fa-chevron-right"></i></a>
        </div>;
    }
}
