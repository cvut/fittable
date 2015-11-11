import React from 'react'
import CP from 'counterpart'

export default function LogoutButton () {
  return (
    <a className="LogoutButton" href="_oauth/login" title={CP.translate('logout')}>
      <i className="LogoutButton-icon fa fa-power-off"></i>
    </a>
  )
}
