import React from 'react'
import { Route } from 'react-router'

const routes = (
  <Route path="/">
    <Route path=":calendarType/:calendarId"/>
  </Route>
)

export default routes
