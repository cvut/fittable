import React from 'react'

import LogoutButton from './LogoutButton'

export default function Footer ({userName}) {
  return (
    <footer className="row footer">
      <div className="footer-usermenu">
        <span className="footer-usermenu-loggedas">Přihlášen jako</span>
                    <span className="footer-usermenu-username">
                      <i className="fa fa-user"></i>
                      <span className="js-username">{userName}</span>
                    </span>
        <LogoutButton />
      </div>
      <div className="footer-content">
        <div className="footer-content-buildinfo">
          &copy; 2015&emsp;&emsp;FIT ČVUT v&nbsp;Praze
        </div>
        <ul>
          <li><a href="https://github.com/cvut/fittable">
            <i className="fa fa-github"></i>
            Fittable
            <span className="footer-content-betalabel">BETA</span></a></li>
          <li><a href="https://github.com/cvut/sirius/wiki">Sirius</a></li>
          <li><a href="mailto:helpdesk@fit.cvut.cz">Report bug</a></li>
        </ul>
        <div className="footer-alert">
          Narazili jste na chybu? Nahlašte nám ji prosím na
          <a href="mailto:helpdesk@fit.cvut.cz">helpdesk@fit.cvut.cz</a>.
          Zatím můžete využít <a href="https://timetable.fit.cvut.cz/old/">původní timetable</a>
        </div>
      </div>
    </footer>
  )
}
