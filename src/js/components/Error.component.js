/**
 * Renders a large alert, telling user that something wrong happened.
 * @author Marián Hlaváč
 */

import CP from '../../../node_modules/counterpart/index.js';

export default class Error extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Renders the component
     */
    render()
    {
        if ( this.props.shown !== false )
        {
            if ( this.props.type == 'access' )
            {
                return <div className="error-message">
                    <i className={ 'icon fa ' + 'fa-lock'}></i>
                    <h2>K tomuto zobrazení nemáte přístup</h2>
                    <p>Omlouváme se, ale pro zobrazení tohoto pohledu kalendáře nemá váš účet dostatečná oprávnění.
                        <br />
                        Zkuste se
                        <a href="javascript:window.history.back()">vrátit zpět</a>
                        .</p>
                </div>;
            }
            else if ( this.props.type == 'connection' && this.props.muted )
            {
                return <div className="muted-error-message"> <i className={ 'icon fa ' + 'fa-plug' }></i> Pracujete bez připojení </div>;
            }
            else if ( this.props.type == 'connection' )
            {
                return <div className="error-message">
                    <i className={ 'icon fa ' + 'fa-plug'}></i>
                    <h2>Problém s připojením</h2>
                    <p>Omlouváme se, ale nedaří se nám stáhnout aktuální data ze serveru. Nebylo ztraceno připojení k Internetu?
                        <br />
                        Zkuste
                        <a href="javascript:window.location.reload()">obnovit stránku</a>
                        ,
                        nebo
                        <a href="#error-muted" onClick={this.props.onMute}>skryjte chybovou hlášku</a>
                        pokud potřebujete dále pracovat bez připojení.</p>
                </div>;
            }
            else
            {
                return <div className="error-message">
                    <i className={ 'icon fa ' + 'fa-exclamation-triangle'}></i>
                    <h2>Kalendář nemohl být zobrazen</h2>
                    <p>Nastala chyba
                        <strong>'{this.props.type} error'</strong>
                        při jeho zobrazování.
                        Omlouváme se za způsobené potíže.
                        <br />
                        Zkuste
                        <a href="javascript:window.location.reload()">obnovit stránku</a>
                        .</p>
                    <p className="please">
                        Jsme fakulta plná vývojářů. Nebojte se otevřít JavaScriptovou konzoli a nahlásit nám chybu do &nbsp;
                        <a href="https://github.com/cvut/fittable/issues">
                            <i className="fa fa-github"></i>
                            issue trackeru</a>
                        .
                        Díky za ochotu.
                    </p>
                </div>;
            }
        }
        else return <div></div>;
    }
}

Error.defaultProps = { type: 'generic', shown: true, muted: false };
