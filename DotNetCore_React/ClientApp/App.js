import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import history from './history'
import routes from './routes'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// Views
const renderApp = appRoutes => {
  ReactDOM.render((
    <AppContainer>
      <Router history={history}>
        <div>
          {appRoutes}
        </div>
      </Router>
    </AppContainer>
  ), document.getElementById('react-app'));
}

renderApp(routes);

//Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default;
    renderApp(routes);
  });
}