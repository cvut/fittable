import React, { Component, PropTypes } from 'react'

const propTypes = {
  view: PropTypes.string,
  semesterName: PropTypes.string,
}

class Header extends Component {

  render () {
    return (
      <header className="row">
        <h1>{this.props.view}</h1>

        <div className="sub-header">{this.props.semesterName}</div>
        <div className="header-usermenu">
          <div className="header-usermenu-username">
            <a href="#">
              <i className="fa fa-user"></i> <span className="js-username">{this.props.userName}</span>
            </a>
          </div>
          <a className="header-usermenu-logout u-hidden"
             href="_oauth/login" alt="Odhlásit se" title="Odhlásit se">
            <i className="fa fa-power-off"></i>
          </a>
        </div>
      </header>
    )
  }

}

Header.propTypes = propTypes

export default Header
