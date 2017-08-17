import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

export function EmptyRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => 
        <div>
          <Component {...props} />
        </div>}
    />

  )
}