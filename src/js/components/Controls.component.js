/**
 * React component
 * @author Marián
 */

import Week from './Week.component';
import WeekNav from './WeekNav.component';
import FunctionsBar from './FunctionsBar.component';
import WeekSwitcher from './WeekSwitcher.component';

export default class Controls extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handler for events, when previous button in WeekNav is clicked ( bubbles from there to parent )
     */
    handlePrevClick()
    {
        this.props.onWeekChange( this.props.viewDate.subtract( 1, 'week' ) );
    }

    /**
     * Handler for events, when next button in WeekNav is clicked ( bubbles form there to parent )
     */
    handleNextClick()
    {
        this.props.onWeekChange( this.props.viewDate.add( 1, 'week' ) );
    }

    handleWeekClick()
    {
        this.refs.weekSwitcher.toggle();
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="header">
            <Week viewDate={this.props.viewDate} onClick={this.handleWeekClick.bind(this)} />
            <WeekNav onPrevClick={this.handlePrevClick.bind(this)} onNextClick={this.handleNextClick.bind(this)} />
            <WeekSwitcher viewDate={this.props.viewDate} ref="weekSwitcher" onDateChange={this.props.onDateChange} />
            <FunctionsBar onLayoutChange={this.props.onLayoutChange} />
        </div>;
    }
}
