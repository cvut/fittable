import React from 'react'
import CP from 'counterpart'

import LogoutButton from './LogoutButton'

function calendarHeader ({type, id}) {
  if (type === 'people' && id === 'me') {
    return `${CP.translate('calendarType.personal')}`
  }

  const cpKey = `calendarType.${type}`
  return `${CP.translate(cpKey)} ${id}`
}

export default function Header ({calendar, userName, semesterName}) {
  return (
    <header className="Header row">
      <h1>{calendarHeader(calendar)}</h1>

      <div className="sub-header">{semesterName}</div>
      <div className="header-usermenu">
        <div className="header-usermenu-username">
          <a href=""> {/* Intentionally left blank to return to base href */}
            <i className="fa fa-user"></i> <span className="js-username">{userName}</span>
          </a>
        </div>
        {/* <LogoutButton /> */}
      </div>
    </header>
  )
}
