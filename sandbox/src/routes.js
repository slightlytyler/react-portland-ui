import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Root } from 'components';
import { Buttons } from 'modules';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <Route path="buttons" component={Buttons} />
    </Route>
  </Router>
);
