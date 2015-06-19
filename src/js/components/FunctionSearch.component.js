/**
 * Function component, search function
 * Provides ability to search events, teachers etc.
 * @author Marián Hlaváč
 */

import React from 'react';
import CP from 'counterpart';

export default class FunctionSearch extends React.Component
{
    constructor( props )
    {
        super.constructor( props );
    }

    /**
     * Handles a form submit, making the search
     * @returns {boolean}
     */
    handleSearch( e )
    {
        this.props.onSearch( this.refs.searchquery.getDOMNode().value );
        e.preventDefault();
    }

    handleResultClick( type, id )
    {
        this.props.onViewChange( type, id );
    }

    /**
     * Renders the component
     */
    render()
    {
        return <div className="function function-search" ref="rootEl">
            <div className="clearfix"></div>
            <div className="search-form">
                <form name="search" onSubmit={this.handleSearch.bind(this)}>
                    <input type="text" name="search" ref="searchquery" placeholder={CP.translate('functions.search.placeholder')} />
                    <button type="submit" className="search" name="search"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="clearfix"></div>
            <div className="search-results" ref="searchResults">
                <ul className="results">
                    {this.props.searchResults.map( function( result ) {
                        return <li key={ 'result-' + result.id }>
                                <a href={ '#' + result.type + '-' + result.id }
                                    onClick={this.handleResultClick.bind( this, result.type, result.id )}>
                                    { 'title' in result ? result.title  : result.id }
                                    <div className="subtext">{ 'title' in result ? result.id : '' }</div>
                                </a>
                            </li>;
                    }.bind(this) ) }
                </ul>
            </div>
            <div className="clearfix"></div>
        </div>;
    }
}
