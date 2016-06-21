import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { getModules, getComponents } from 'helpers';
import Root from './components/Root';

export default data => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={Root}
      modules={getModules(data)}
      packages={getComponents(data)}
    >
      <Route path=":module" />
    </Route>
  </Router>
);
