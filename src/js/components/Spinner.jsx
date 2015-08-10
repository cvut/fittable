/**
 * Ajax spinner element
 * Used Spinkit @ tobiasahlin.com/spinkit, thanks
 */

import React, { PropTypes } from 'react'

const propTypes = {
  show: PropTypes.bool,
}

class Spinner extends React.Component {

  render () {

    return (
      <div className={ 'spinner' + (this.props.show ? '' : ' hide')}>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    )
  }
}

Spinner.propTypes = propTypes

export default Spinner
