import React, { Component, PropTypes } from 'react'

const propTypes = {
  userName: PropTypes.string,
}

class Footer extends Component {

  render () {
    return (
      <footer className="row footer">
        <div className="footer-usermenu">
          <span className="footer-usermenu-loggedas">Přihlášen jako</span>
                    <span className="footer-usermenu-username">
                      <i className="fa fa-user"></i>
                      <span className="js-username">{this.props.userName}</span>
                    </span>
          <a className="footer-usermenu-logout u-hidden" href="_oauth/login">
            <i className="fa fa-power-off"></i>
            <span>Odhlásit se</span>
          </a>
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

}

Footer.propTypes = propTypes

export default Footer
