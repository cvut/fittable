import React from 'react'
import CP from 'counterpart'

import LogoutButton from './LogoutButton'

export default function Footer ({userName}) {
  return (
    <footer className="row footer">
      <div className="footer-usermenu">
        <span className="footer-usermenu-loggedas">{CP.translate('footer.loggedInAs')}{'\u0020'}</span>
          <span className="footer-usermenu-username">
            <i className="fa fa-user"></i>
            <span>{userName}</span>
          </span>
        { /*<LogoutButton />*/ }
      </div>
      <div className="footer-content">
        <div className="footer-content-buildinfo">
        </div>
        <ul>
          <li><a href="https://github.com/cvut/fittable">
            <i className="fa fa-github"></i>
            Fittable{'\u0020'}
            <span className="footer-content-betalabel">BETA</span></a></li>
          <li><a href="https://github.com/cvut/sirius/wiki">Sirius</a></li>
          <li><a href="mailto:helpdesk@fit.cvut.cz">{CP.translate('footer.reportBug')}</a></li>
        </ul>
        <div className="footer-alert">
          {CP.translate('footer.reportBugPlead')}
          {'\u00a0'}
          <a href="mailto:helpdesk@fit.cvut.cz">helpdesk@fit.cvut.cz</a>.
          {'\u0020'}
          {CP.translate('footer.meanwhile')}
          {'\u0020'}
          <a href="https://timetable.fit.cvut.cz/old/">{CP.translate('footer.oldTimetable')}</a>
        </div>
      </div>
    </footer>
  )
}
