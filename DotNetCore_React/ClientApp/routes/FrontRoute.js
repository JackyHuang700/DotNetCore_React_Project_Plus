import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

export function FrontRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) =>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Front Home</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">

            </div>
            <Component {...props} />
          </div>
        </div>
      }
    />
  )
}