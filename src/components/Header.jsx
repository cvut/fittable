import React from 'react'

import LogoutButton from './LogoutButton'

export default function Header ({view, userName, semesterName}) {
  return (
    <header className="Header row">
      <h1>{view}</h1>

      <div className="sub-header">{semesterName}</div>
      <div className="header-usermenu">
        <div className="header-usermenu-username">
          <a href=""> {/* Intentionally left blank to return to base href */}
            <i className="fa fa-user"></i> <span className="js-username">{userName}</span>
          </a>
        </div>
        {/*<LogoutButton />*/}
      </div>
    </header>
  )
}
