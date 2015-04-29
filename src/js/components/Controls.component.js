/**
 * React component
 * @author Marián
 */

import Week from './Week.component';
import WeekNav from './WeekNav.component';
import FunctionsBar from './FunctionsBar.component';

export default class Controls extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handler for events, when previous button in WeekNav is clicked ( bubbles from there to parent )
     * @param e event
     */
    onPrevClick( e )
    {
        this.props.onWeekChange( this.props.week - 1 );
    }

    /**
     * Handler for events, when next button in WeekNav is clicked ( bubbles form there to parent )
     * @param e event
     */
    onNextClick( e )
    {
        this.props.onWeekChange( this.props.week + 1 );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="header">
            <Week week={this.props.week} />
            <WeekNav onPrevClick={this.onPrevClick.bind(this)} onNextClick={this.onNextClick.bind(this)} />
            <FunctionsBar />
        </div>;
    }
}
