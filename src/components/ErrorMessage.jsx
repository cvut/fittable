/**
 * Renders a large alert, telling user that something wrong happened.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  visible: PropTypes.bool,
  onErrorHide: PropTypes.func.required,
}

const defaultProps = {
  type: 'generic',
  visible: true,
}

class Error extends React.Component {

  renderHideButton (action) {
    return (
      <button
        onClick={action}>
        {CP.translate('errors.hide_this')}
      </button>
    )
  }

  render () {
    const {onErrorHide, type, visible} = this.props
    if (!visible) {
      // null or false is legit to render for React
      return null
    }

    switch (type) {
      // Access error - user permissions
      case 'access':
        return (
          <div className="error-message">
            <i className="icon fa fa-lock"></i>
            <h2>{CP.translate('errors.access_title')}</h2>
            <p>
              {CP.translate('errors.access_desc')}
              <br />
              {CP.translate('errors.access_desc2')}
              <br />
              {CP.translate('errors.access_try')}
              <a href="javascript:window.location.back()">{CP.translate('errors.access_goback')}</a>.
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      case 'notfound':
        return (
          <div className="error-message">
            <i className="icon fa fa-calendar-o"></i>
            <h2>{CP.translate('errors.notfound_title')}</h2>
            <p>
              {CP.translate('errors.notfound_desc')}
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      case 'ownnotfound':
        return (
          <div className="error-message">
            <i className="icon fa fa-calendar-o"></i>
            <h2>{CP.translate('errors.ownnotfound_title')}</h2>
            <p>
              {CP.translate('errors.ownnotfound_desc')}
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      case 'connection':
        return (
          <div className="error-message">
            <i className="icon fa fa-plug"></i>
            <h2>{CP.translate('errors.connection_title')}</h2>
            <p>
              {CP.translate('errors.connection_desc')}
              <br /> {CP.translate('errors.connection_try')}
              <a href="javascript:window.location.reload()">{CP.translate('errors.refresh')}</a>.
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      case 'unauthorized':
        return (
          <div className="error-message">
            <i className="icon fa fa-lock"></i>
            <h2>{CP.translate('errors.unauthorized_title')}</h2>
            <p>
              {CP.translate('errors.unauthorized_desc')}
              <a href="landing.html">{CP.translate('errors.unauthorized_login')}</a>.
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      case 'servererror':
        return (
          <div className="error-message">
            <i className="icon fa fa-lock"></i>
            <h2>{CP.translate('errors.unauthorized_title')}</h2>
            <p>
              {CP.translate('errors.unauthorized_desc')}
              <a href="landing.html">{CP.translate('errors.unauthorized_login')}</a>.
              {this.renderHideButton(onErrorHide)}
            </p>
          </div>
        )
      default:
        return (
          <div className="error-message">
            <i className="icon fa fa-exclamation-triangle"></i>
            <h2>{CP.translate('errors.generic_title')}</h2>
            <p>
              {CP.translate('errors.generic_desc', { type: this.props.type })}
              <br /> {CP.translate('errors.generic_try')}
              {this.renderHideButton(onErrorHide)}
            </p>
            <p className="please">
              {CP.translate('errors.help_please')}&nbsp;
              <a href="https://github.com/cvut/fittable/issues">
                <i className="fa fa-github"></i>&nbsp;{CP.translate('errors.help_tracker')}
              </a>.
              {CP.translate('errors.help_thanks')}
            </p>
          </div>
        )
    }
  }
}

Error.propTypes = propTypes
Error.defaultProps = defaultProps

export default Error
