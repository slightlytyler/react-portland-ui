import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { getModules, getPackages } from 'helpers';
import Root from './components/Root';

const routes = (data) => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={Root}
      modules={getModules(data)}
      packages={getPackages(data)}
    >
      <Route path=":module">
        <Route path=":package" />
      </Route>
    </Route>
  </Router>
);

export default routes;
