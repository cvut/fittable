/**
 * Renders a large alert, telling user that something wrong happened.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  visible: PropTypes.bool,
}

const defaultProps = {
  type: 'generic',
  visible: true,
}

class Error extends React.Component {

  render () {

    if (this.props.visible !== false) {

      /**
       * Access error
       */
      if (this.props.type == 'access') {
        return (
          <div className="error-message">
            <i className="icon fa fa-lock"></i>
            <h2>{CP.translate('errors.access_title')}</h2>
            <p>
              {CP.translate('errors.access_desc')}
              <br />
              {CP.translate('errors.access_try')}
              <a href="javascript:window.location.back()">{CP.translate('errors.access_goback')}</a>.
              <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
           </p>
         </div>
        )
      /**
       * Calendar not found error
       */
      } else if (this.props.type == 'notfound') {
        return (
            <div className="error-message">
              <i className="icon fa fa-calendar-o"></i>
              <h2>{CP.translate('errors.notfound_title')}</h2>
              <p>
                {CP.translate('errors.notfound_desc')}<br />
                {CP.translate('errors.notfound_desc2')}<br /><br />
                <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
              </p>
            </div>
        )
      /**
       * Own calendar not found error
       */
      } else if (this.props.type == 'ownnotfound') {
        return (
            <div className="error-message">
              <i className="icon fa fa-calendar-o"></i>
              <h2>{CP.translate('errors.ownnotfound_title')}</h2>
              <p>
                {CP.translate('errors.ownnotfound_desc')}<br />
                {CP.translate('errors.ownnotfound_desc2')}<br /><br />
                <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
              </p>
            </div>
        )
        /**
         * Connection error
         */
      } else if (this.props.type == 'connection') {
        return (
            <div className="error-message">
              <i className="icon fa fa-plug"></i>
              <h2>{CP.translate('errors.connection_title')}</h2>
              <p>
                {CP.translate('errors.connection_desc')}
                <br /> {CP.translate('errors.connection_try')}
                <a href="javascript:window.location.reload()">{CP.translate('errors.refresh')}</a>.
                <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
              </p>
            </div>
        )
        /**
         * User unauthorized error
         */
      } else if (this.props.type == 'unauthorized') {
        return (
            <div className="error-message">
              <i className="icon fa fa-plug"></i>
              <h2>{CP.translate('errors.unauthorized_title')}</h2>
              <p>
                {CP.translate('errors.unauthorized_desc')}
                <br /> {CP.translate('errors.unauthorized_try')}
                <a href="landing.html">{CP.translate('errors.unauthorized_login')}</a>.
                <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
              </p>
            </div>
        )
      /**
       * Server error
       */
      } else if (this.props.type == 'servererror') {
        return (
            <div className="error-message">
              <i className="icon fa fa-plug"></i>
              <h2>{CP.translate('errors.servererror_title')}</h2>
              <p>
                {CP.translate('errors.servererror_desc')}
                <br /> {CP.translate('errors.servererror_try')}
                <a href="javascript:window.location.reload()">{CP.translate('errors.refresh')}</a>.
                <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
              </p>
            </div>
        )
      /**
       * Generic error
       */
      } else {
        return (
          <div className="error-message">
            <i className="icon fa fa-exclamation-triangle"></i>
            <h2>{CP.translate('errors.generic_title')}</h2>
            <p>
              {CP.translate('errors.generic_desc', { type: this.props.type })}
              <br /> {CP.translate('errors.generic_try')}
              <button onClick={this.props.onMute}>{CP.translate('errors.hide_this')}</button>
            </p>
            <p className="please">
              {CP.translate('errors.help_please')}&nbsp;<a href="https://github.com/cvut/fittable/issues"><i className="fa fa-github"></i>&nbsp;{CP.translate('errors.help_tracker')}</a>.
              {CP.translate('errors.help_thanks')}
            </p>
          </div>
        )
      }
    } else {
      return <div />
    }
  }
}

Error.propTypes = propTypes
Error.defaultProps = defaultProps

export default Error
