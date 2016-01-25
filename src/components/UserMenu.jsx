import React from 'react'

import LogoutButton from './LogoutButton'

export default function UserMenu ({ userName, onLogout }) {
  return (
      <div className="header-usermenu">
        <div className="header-usermenu-username">
          <a href=""> {/* Intentionally left blank to return to base href */}
            <i className="fa fa-user"></i> <span>{userName}</span>
          </a>
        </div>
        <LogoutButton onClick={onLogout} />
      </div>
  )
}
