import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import {Auth} from '../helpers/auth'

export function LoginRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => Auth.isAuthenticated === true
        ? <Redirect to={{ pathname: '/Dashboard', state: { from: props.location } }} />
        :
        <div>
          <Component {...props} />
        </div>}
    />

  )
}