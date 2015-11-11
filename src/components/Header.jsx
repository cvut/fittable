import React, { Component } from 'react'

export default class Header extends Component {

  render () {
    return (
      <header className="row">
        <h1>heading</h1>

        <div className="sub-header">subheading</div>
        <div className="header-usermenu">
          <div className="header-usermenu-username">
            <a href="#">
              <i className="fa fa-user"></i> <span className="js-username">username</span>
            </a>
          </div>
          <a className="header-usermenu-logout visually-hidden"
             href="_oauth/login" alt="Odhlásit se" title="Odhlásit se">
            <i className="fa fa-power-off"></i>
          </a>
        </div>
      </header>
    )
  }

}
