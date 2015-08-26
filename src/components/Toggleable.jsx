/**
 * Base class (component) for all toggleable components. Used primarily for functions dialogs
 */

import React from 'react'

class Toggleable extends React.Component {

  /**
   * Toggles this component
   */
  toggle () {

    if (!this.refs.rootEl.classList.contains('hide')) {
      this.refs.rootEl.classList.add('hide')
    } else {
      this.refs.rootEl.classList.remove('hide')
    }
  }

  /**
   * Shows this component
   */
  show () {
    this.refs.rootEl.classList.remove('hide')
  }

  hide () {

    if (!this.refs.rootEl.classList.contains('hide')) {
      this.refs.rootEl.classList.add('hide')
    }
  }
}

export default Toggleable
