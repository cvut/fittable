/**
 * Main application file of Fittable
 *  - Requires React.js to be loaded before loading this
 *
 *  @author Marián Hlaváč
 */

/**
 * Convertion date -> week
 * thx http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 * @returns {number}
 */
Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

Date.fromWeeksUTC = function ( weeks, year ) {
    var date = new Date( Date.UTC( year, 0 ) );
    var dayOffset = 3 - ( date.getDay() === 0 ? 6 : date.getDay() - 1 );
    var firstThursday = new Date( date );
    firstThursday.setDate( date.getDate() + dayOffset );
    var firstWeek = firstThursday.getWeekNumber();
    if ( firstWeek <= 1 ) weeks--;
    var res = new Date( firstThursday );
    res.setDate( firstThursday.getDate() + weeks * 7 - 2 )
    return res;
};

import Fittable from './components/fittable.component';

global.fittable = function ( containerElId, dataCallback )
{
    // Render Fittable!
    var element = React.createElement( Fittable, { dataCallback: dataCallback } );
    React.render( element, document.getElementById( containerElId ) );
    return element;
};
