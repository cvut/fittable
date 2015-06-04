/**
 * React component
 * @author Marián
 */

export default class Week extends React.Component
{
    constructor( props )
    {
        super.constructor( props );

        this.state = {
            icon: 'fa fa-caret-down'
        };
    }

    handleClick( e )
    {
        this.props.onClick();
        this.setState( { icon: ( this.state.icon == 'fa fa-caret-down' ? 'fa fa-caret-up': 'fa fa-caret-down' ) } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="week">
            <a href="#" className="date-selection" onClick={this.handleClick.bind(this)}>
                <strong className="week-text">Týden {this.props.viewDate.isoWeek()}&nbsp;&nbsp;</strong>
                <span className="week-parity-text">{this.props.viewDate.isoWeek() % 2 == 0 ? 'sudý' : 'lichý'}</span>
                <i className={this.state.icon}></i>
            </a>
        </div>;
    }
}
