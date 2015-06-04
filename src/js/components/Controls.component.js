/**
 * Wraps all controls displayed in the heading of widget.
 * Contains week controllers and functions tools.
 * @author Marián Hlaváč
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
     * Handles WeekNav's previous button click event
     */
    handlePrevClick()
    {
        this.props.onWeekChange( this.props.viewDate.subtract( 1, 'week' ) );
    }

    /**
     * Handles WeekNav's next button click event
     */
    handleNextClick()
    {
        this.props.onWeekChange( this.props.viewDate.add( 1, 'week' ) );
    }

    /**
     * Handles a click on a week row in the WeekSelector
     */
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
            <FunctionsBar onLayoutChange={this.props.onLayoutChange} displayFilter={this.props.displayFilter} onFilterChange={this.props.onFilterChange} />
        </div>;
    }
}
