import React from 'react'
import CP from 'counterpart'

export default function LogoutButton ({ onClick }) {
  return (
    <button className="LogoutButton" title={CP.translate('logout')} onClick={onClick}>
      <i className="LogoutButton-icon fa fa-power-off"></i>
      <span>{CP.translate('logout')}</span>
    </button>
  )
}
