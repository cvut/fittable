import React from 'react'

export default function LogoutButton () {
  return (
    <a className="LogoutButton" href="_oauth/login" alt="Odhlásit se" title="Odhlásit se">
      <i className="LogoutButton-icon fa fa-power-off"></i>
    </a>
  )
}
