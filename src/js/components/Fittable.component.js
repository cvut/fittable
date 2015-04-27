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
        this.state = {
            selectedWeek: 1
        };
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
                starts: "12:00:00",
                ends: "13:30:00",
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

    /**
     * Renders the component
     */
    render()
    {
        return <div className="fittable-container">
            <Controls />
            <Timetable weekEvents={this.getWeekEvents( this.state.selectedweek, 2015 )} />
        </div>;
    }
}
