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

    onPrevClick( e )
    {
        this.props.onWeekChange( this.props.week - 1 );
    }

    onNextClick( th )
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
