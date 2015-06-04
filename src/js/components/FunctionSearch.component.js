/**
 * Function component, search function
 * Provides ability to search events, teachers etc.
 * @author Marián Hlaváč
 */

import Toggleable from './Toggleable.component';

export default class FunctionSearch extends Toggleable
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handles a form submit, making the search
     * @returns {boolean}
     */
    handleSearch( )
    {
        this.refs.searchResults.getDOMNode().classList.remove( 'hide' );
        return false;
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-search hide" ref="rootEl">
            <div className="clearfix"></div>
            <div className="search-form">
                <form name="search" onSubmit={this.handleSearch.bind(this)}>
                    <input type="text" name="search" placeholder="Hledat" />
                    <button type="submit" className="search" name="search"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="clearfix"></div>
            <div className="search-results hide" ref="searchResults">
                <ul className="results">
                    <li>
                        <a href="#">
                            Ing. Jindřich <strong>Nov</strong>otný
                            <div className="subtext">Lorem ipsum dolor sit</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            Ing. Josef <strong>Nov</strong>ák
                            <div className="subtext">Lorem ipsum dolor sit</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            MI-VNP
                            <div className="subtext">Výroba <strong>nov</strong>ých předmětů</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="clearfix"></div>
        </div>;
    }
}
