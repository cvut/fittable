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

    onClick( e )
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
            <a href="#" className="date-selection" onClick={this.onClick.bind(this)}>
                <strong className="week-text">Týden {this.props.week}&nbsp;&nbsp;</strong>
                <span className="week-parity-text">{this.props.week % 2 == 0 ? 'sudý' : 'lichý'}</span>
                <i className={this.state.icon}></i>
            </a>
        </div>;
    }
}
