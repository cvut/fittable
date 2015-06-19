/**
 * Week navigator components consists of two buttons, one for navigation to the left and second for navigation to the
 * right.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';

export default class WeekNav extends React.Component
{
    /**
     * Handler for events, when the previous button is clicked ( bubbles to parent )
     * @param e event
     */
    handlePrevClick( e )
    {
        this.props.onPrevClick( e );
    }

    /**
     * Handler for events, when the next button is clicked ( bubbles to parent )
     * @param e
     */
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
            <a href="#" className="previous-week" onClick={this.handlePrevClick.bind( this )} title={CP.translate('weekNav.prev')}><i className="fa fa-chevron-left"></i></a>
            <a href="#" className="next-week" onClick={this.handleNextClick.bind( this )} title={CP.translate('weekNav.next')}><i className="fa fa-chevron-right"></i></a>
        </div>;
    }
}
