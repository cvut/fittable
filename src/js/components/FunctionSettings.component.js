/**
 * Function component, settings function
 * Main dialog containing all important options to customize look and behaviour of fittable
 * @author Marián Hlaváč
 */

import Toggleable from './Toggleable.component';

export default class FunctionSettings extends Toggleable
{
    constructor( props )
    {
        super.constructor( props );

        // Default layout is horizontal
        this.state = {
            activeLayout: 'horizontal'
        };
    }

    /**
     * Handles layout selection
     * @param to Selected layout
     */
    handleLayoutSelect( to )
    {
        // Delegate to parent
        this.props.onLayoutChange( to );

        // Set the state
        this.setState( { activeLayout: to } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-settings hide" ref="rootEl">
            <div className="clearfix"></div>
            <h2>rozložení</h2>
            <div className="row">
                <div className="column small-6">
                    <a href="#" className={ "layout-selector"  + ( this.state.activeLayout == 'horizontal' ? ' active' : '' )} ref="horizontallayout" onClick={this.handleLayoutSelect.bind( this, 'horizontal' )} >
                        <i className="fa fa-th-list"></i>
                        řádkové
                    </a>
                </div>
                <div className="column small-6">
                    <a href="#" className={ "layout-selector"  + ( this.state.activeLayout == 'vertical' ? ' active' : '' )} ref="verticallayout" onClick={this.handleLayoutSelect.bind( this, 'vertical' )}>
                        <i className="fa fa-th"></i>
                        sloupcové
                    </a>
                </div>
            </div>
            <h2>nastavení</h2>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="exampleRadioSwitch1" type="radio" checked name="testGroup" />
                        <label for="exampleRadioSwitch1"></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    Rozlišovat typy barevně
                </div>
            </div>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="exampleRadioSwitch1" type="radio" checked name="testGroup" />
                        <label for="exampleRadioSwitch1"></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    Lorem ipsum
                </div>
            </div>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="exampleRadioSwitch1" type="radio" checked name="testGroup" />
                        <label for="exampleRadioSwitch1"></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    Dolor sit
                </div>
            </div>
            <h2>about</h2>
            <p>
                Fittable is Species volares, tanquam fortis solem. Resistentia congregabos, tanquam bi-color nomen. Sunt fermiumes promissio dexter, rusticus diatriaes.<br />
                <a href="#">Frequently asked questions</a><br />
                <a href="#">Contact us</a>
            </p>

        </div>;
    }
}
