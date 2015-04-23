/**
 * React component
 * @author Marián
 */

import Week from './Week.component'
import WeekNav from './WeekNav.component'
import FunctionsBar from './FunctionsBar.component'

export default class Controls extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="header">
            <Week /> <WeekNav /> <FunctionsBar />
        </div>;
    }
}
