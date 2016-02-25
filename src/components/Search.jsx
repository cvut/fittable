/**
 * Function component, search function
 * Provides ability to search events, teachers etc.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  onSearch: PropTypes.func,
  onViewChange: PropTypes.func,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
  })),
}

class Search extends React.Component {

  constructor (props) {

    super(props)
    this.autoSearchTimeout = null
  }

  /**
   * Handles a form submit, making the search
   * @returns {boolean}
   */
  handleSearch (e) {

    this.props.onSearch(this.refs.searchquery.value)
    e.preventDefault()
  }

  handleResultClick (type, id) {
    this.props.onViewChange(type, id)
  }

  handleInputKeyup (e) {

    if (e.target.value.length >= 3) {
      if (this.autoSearchTimeout !== null) {
        clearTimeout(this.autoSearchTimeout)
      }

      this.autoSearchTimeout = setTimeout(() => {
        this.props.onSearch(this.refs.searchquery.value)
      }, 100)
    }
  }

  componentDidMount () {
    this.refs.searchquery.addEventListener('keyup', this.handleInputKeyup.bind(this))
  }

  componentWillUnmount () {
    this.refs.searchquery.removeEventListener('keyup', this.handleInputKeyup.bind(this))
  }

  render () {
    const searchResultsClass = 'Search-results' +
      (this.props.searchResults.length ? ' is-active' : '')

    return (
      <div className="Search" ref="rootEl">
        <div className="Search-input" ref="searchResults">
          <form name="search" onSubmit={this.handleSearch.bind(this)}>
            <label className="Search-icon" htmlFor="searchinput">
              <i className="fa fa-search"></i>
            </label>
            <input
              type="text"
              id="searchinput"
              name="search"
              ref="searchquery"
              autoComplete="off"
              required
              placeholder={CP.translate('functions.search.placeholder')}
            />
          </form>
        </div>
        <div className={searchResultsClass}>
          <ul>
            {this.props.searchResults.map(function (result) {
              return (
                <li key={ 'result-' + result.id }>
                  <button
                    type="button"
                    onClick={this.handleResultClick.bind(this, result.type, result.id)}
                    className="Search-result"
                  >
                    {'title' in result ? result.title : result.id}
                    <div className="subtext">
                      {'title' in result ? result.id : ''}
                    </div>
                  </button>
                </li>
             )
            }.bind(this)) }
           </ul>
         </div>
       </div>
    )
  }
}

Search.propTypes = propTypes

export default Search
