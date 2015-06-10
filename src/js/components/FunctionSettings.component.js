/**
 * Function component, settings function
 * Main dialog containing all important options to customize look and behaviour of fittable
 * @author Marián Hlaváč
 */

import CP from '../../../node_modules/counterpart/index.js';
import Moment from '../../../bower_components/moment/moment.js';

export default class FunctionSettings extends React.Component
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
     * @param sel Selected layout
     */
    handleLayoutSelect( sel )
    {
        // Delegate to parent
        this.props.onLayoutChange( sel );

        // Set the state
        this.setState( { activeLayout: sel } );
    }

    /**
     * Handles language selection
     * @param sel Selected layout
     */
    handleLanguageSelect( sel )
    {
        this.props.onLanguageChange();

        CP.setLocale( sel );
        Moment.locale( sel );

        // Force refresh
        this.setState( { } );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-settings" ref="rootEl">
            <div className="clearfix"></div>
            <div className="row">
                <div className="column medium-6">
                    <h2>{CP.translate( 'functions.settings.layout' )}</h2>
                    <div className="toggleable-h">
                        <a href="#" className={ ( this.state.activeLayout == 'horizontal' ? ' active' : '' )} onClick={this.handleLayoutSelect.bind( this, 'horizontal' )} >
                            <i className="fa fa-fw fa-th-list"></i>
                            {CP.translate( 'functions.settings.layout_horizontal' )}
                        </a>
                        <a href="#" className={ ( this.state.activeLayout == 'vertical' ? ' active' : '' )} onClick={this.handleLayoutSelect.bind( this, 'vertical' )}>
                            <i className="fa fa-fw fa-th"></i>
                            {CP.translate( 'functions.settings.layout_vertical' )}
                        </a>
                    </div>
                </div>
                <div className="column medium-6">
                    <h2>{CP.translate( 'functions.settings.language' )}</h2>
                    <div className="toggleable-h">
                        <a href="#" className={ ( CP.getLocale() == 'cs' ? ' active' : '' )} onClick={this.handleLanguageSelect.bind( this, 'cs' )} >
                            {CP.translate( 'functions.settings.language_czech' )}
                        </a>
                        <a href="#" className={ ( CP.getLocale() == 'en' ? ' active' : '' )} onClick={this.handleLanguageSelect.bind( this, 'en' )}>
                            {CP.translate( 'functions.settings.language_english' )}
                        </a>
                    </div>
                </div>
            </div>
            <h2>{CP.translate( 'functions.settings.settings' )}</h2>
            <div className="row">
                <div className="column small-3">
                    <div className="switch small">
                        <input id="exampleRadioSwitch1" type="radio" checked name="testGroup" />
                        <label for="exampleRadioSwitch1"></label>
                    </div>
                </div>
                <div className="column small-9 switch-label">
                    {CP.translate( 'functions.settings.settings_colors' )}
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
                    {CP.translate( 'functions.settings.settings_7day' )}
                </div>
            </div>
            <h2>{CP.translate( 'functions.settings.about.title' )}</h2>
            <p>
                {CP.translate( 'functions.settings.about.description' )}
            </p>
            <p>
                {CP.translate( 'functions.settings.about.usage' )}
            </p>
            <p>
                <a href="#">{CP.translate( 'functions.settings.about.faq' )}</a><br />
                <a href="#">{CP.translate( 'functions.settings.about.help' )}</a>
            </p>

        </div>;
    }
}
