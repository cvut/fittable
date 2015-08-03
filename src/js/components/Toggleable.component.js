/**
 * Base class (component) for all toggleable components. Used primarily for functions dialogs
 */

import React from 'react'

export default class Toggleable extends React.Component {

  constructor (props) {
    super.constructor(props)
  }

  /**
   * Toggles this component
   */
  toggle () {

    if (!this.refs.rootEl.getDOMNode().classList.contains('hide')) {
      this.refs.rootEl.getDOMNode().classList.add('hide')
    } else {
      this.refs.rootEl.getDOMNode().classList.remove('hide')
    }
  }

  /**
   * Shows this component
   */
  show () {
    this.refs.rootEl.getDOMNode().classList.remove('hide')
  }

  hide () {

    if (!this.refs.rootEl.getDOMNode().classList.contains('hide')) {
      this.refs.rootEl.getDOMNode().classList.add('hide')
    }
  }
}
