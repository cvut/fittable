/**
 * React component
 * @author Marián
 */

export default class WeekSwitcher extends React.Component
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="date-selector hide">
            <span className="label">Týden</span>
            <ul className="week-selection" data-js-filled></ul>
            <span className="label">Měsíc</span>
            <ul className="month-selection" data-js-filled></ul>
            <span className="label">Semestr</span>
            <ul className="semester-selection" data-js-filled></ul>
        </div>;
    }
}
