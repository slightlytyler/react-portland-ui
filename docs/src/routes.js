import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { getModules, getComponents } from 'helpers';
import Root from './components/Root';

const Routes = ({ data }) => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={Root}
      modules={getModules(data)}
      packages={getComponents(data)}
    >
      <Route path=":module">
        <Route path=":package" />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Routes;
