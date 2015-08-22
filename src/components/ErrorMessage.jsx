/**
 * Renders a large alert, telling user that something wrong happened.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'

const propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  shown: PropTypes.bool,
  muted: PropTypes.bool,
}

const defaultProps = {
  type: 'generic',
  shown: true,
  muted: false,
}

class Error extends React.Component {

  render () {

    if (this.props.shown !== false) {
      if (this.props.type == 'access') {
        return (
          <div className="error-message">
            <i className="icon fa fa-lock"></i>
            <h2>{CP.translate('errors.access_title')}</h2>
            <p>
              {CP.translate('errors.access_desc')}
              <br />
              {CP.translate('errors.access_try')}
              <a href="javascript:window.history.back()">{CP.translate('errors.access_trygoback')}</a>.
           </p>
         </div>
        )
      } else if (this.props.type == 'connection' && this.props.muted) {
        return (
          <div className="muted-error-message">
            <i className="icon fa fa-plug"></i> {CP.translate('errors.connection_muted_message')}
          </div>
        )
      } else if (this.props.type == 'connection') {
        return (
          <div className="error-message">
            <i className="icon fa fa-plug"></i>
            <h2>{CP.translate('errors.connection_title')}</h2>
            <p>
              {CP.translate('errors.connection_desc')}
              <br /> {CP.translate('errors.connection_try')}
              <a href="javascript:window.location.reload()">{CP.translate('errors.connection_refresh')}</a>
              {CP.translate('errors.connection_part_or')}
              <a href="#error-muted" onClick={this.props.onMute}>{CP.translate('errors.connection_mutelink')}</a>.
              {CP.translate('errors.connection_mutelink_partafter')}
            </p>
          </div>
        )
      } else {
        return (
          <div className="error-message">
            <i className="icon fa fa-exclamation-triangle"></i>
            <h2>{CP.translate('errors.generic_title')}</h2>
            <p>
              {CP.translate('errors.generic_desc', { type: this.props.type })}
              <br /> {CP.translate('errors.generic_try')}
              <a href="javascript:window.location.reload()">{CP.translate('errors.generic_refreshpage')}</a>
            </p>
            <p className="please">
              {CP.translate('errors.help_please')}
              <a href="https://github.com/cvut/fittable/issues"><i className="fa fa-github"></i> issue tracker</a>.
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
