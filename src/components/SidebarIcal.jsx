import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import CP from 'counterpart'

const SidebarIcal = React.createClass({

  propTypes: {
    username: PropTypes.string,
    token: PropTypes.string,
  },

  onInputClick () {
    findDOMNode(this.refs.urlInput).select()
  },

  getIcalUrl () {
    const {username, token} = this.props
    if (!username || !token) {
      return ''
    }
    return `https://sirius.fit.cvut.cz/api/v1/people/${username}/events.ical?access_token=${token}`
  },

  render () {
    const icalUrl = this.getIcalUrl()
    return (
      <div className="function SidebarIcal" ref="rootEl">
        <div className="clearfix" />
        <h2>{CP.translate('functions.ical.title')}</h2>
        <p>{CP.translate('functions.ical.desc')}</p>
        <p>
          <a
            href="https://github.com/cvut/sirius/wiki/Nastaven%C3%AD-kalend%C3%A1%C5%99e"
            target="_blank"
          >
            {CP.translate('functions.ical.help')}
          </a>
        </p>
        <p>
        <label>
          {CP.translate('functions.ical.label')}
          <input
            ref="urlInput"
            value={icalUrl}
            onClick={this.onInputClick}
            className="SidebarIcal-input"
            readOnly
          />
        </label>
        </p>
      </div>
    )
  },
})

export default SidebarIcal
