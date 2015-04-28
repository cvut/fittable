/**
 * React component
 * @author Marián
 */

import Controls from './Controls.component';
import Timetable from './Timetable.component';

export default class Fittable extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        // Temporary actual week getting (this is just a wrong place)
        var d = new Date();
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        var weekno = Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);

        this.state = {
            selectedWeek: weekno,
            selectedYear: d.getFullYear()
        };

        this.weekEvents = null;
    }

    getWeekEvents( weekNum, year )
    {
        var data = [];

        for ( var i = 0; i < 6; i++ )
        {
            data[i] = {
                id: Math.floor( Math.random() * (9999 - 1000) ) + 1000,
                name: "BI-" + Math.random().toString(36).substring(10).toUpperCase(),
                note: "Placeholder event",
                day: Math.floor( Math.random() * 6 ),
                starts: Math.floor( Math.random() * 76400 ),
                ends: Math.floor( Math.random() * 76400 ),
                type: "laboratory",
                room: "T9:303",
                teacher: "Ing. Josef Nováček",
                teacherlogin: "novacjo7",
                studentsCount: 221,
                flag: null,
                notification: false,
                details: {
                    todo: true // todo: very to-do, many unfinished
                }
            };
        }

        return data;
    }

    componentWillMount()
    {
        this.weekEvents = this.getWeekEvents( this.state.selectedWeek, this.state.selectedYear );
    }

    changeWeek( week )
    {
        // Cacluclate num of weeks in year
        var yr = this.state.selectedYear;
        var d = new Date(yr, 0, 1);
        var isLeap = (yr%400)?((yr%100)?((yr%4)?false:true):false):true;
        var weeksInYear = d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52;
        var animDirection = null;

        // Going to previous year
        if ( week < 1 )
        {
            this.setState( { selectedYear: this.state.selectedYear - 1 } );
            yr--;

            // Cacluclate num of weeks in prev year first
            d = new Date(yr, 0, 1);
            isLeap = (yr%400)?((yr%100)?((yr%4)?false:true):false):true;

            this.setState( { selectedWeek: d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52 } );
            animDirection = -1;
        }
        // Going to next year
        else if ( week > weeksInYear )
        {
            this.setState( { selectedWeek: 1, selectedYear: this.state.selectedYear + 1 } );
            animDirection = 1;
        }
        // Same year
        else
        {
            animDirection = week > this.state.selectedWeek ? 1 : -1;
            this.setState( { selectedWeek: week } );

        }

        // Refresh week
        this.weekEvents = this.getWeekEvents( this.state.selectedWeek, this.state.selectedYear );

        // Do the animation
        if ( animDirection == 1 ) this.refs.timetable.animateLeft(); else this.refs.timetable.animateRight();
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="fittable-container">
            <Controls week={this.state.selectedWeek} onWeekChange={this.changeWeek.bind(this)} />
            <Timetable weekEvents={this.weekEvents} ref="timetable" />
        </div>;
    }
}
