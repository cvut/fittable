/**
 * Ajax spinner element
 *
 * Used Spinkit @ tobiasahlin.com/spinkit, thanks
 *
 * @author Marián Hlaváč
 * @author tobiasahlin.com/spinkit
 */

import React from 'react'

export default class Week extends React.Component {
  constructor (props) {
    super.constructor(props)
  }

  /**
   * Renders the component
   */
  render () {

    return <div className={ 'spinner' + (this.props.show ? '' : ' hide')}>
             <div className="rect1"></div>
             <div className="rect2"></div>
             <div className="rect3"></div>
             <div className="rect4"></div>
             <div className="rect5"></div>
           </div>
  }
}
