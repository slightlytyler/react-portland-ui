import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/index.styl';
import Root from './components/Root';

import DATA from 'build/data';
import { getModules, getComponents } from 'helpers';

const render = data => ReactDOM.render(
  <Root modules={getModules(data)} components={getComponents(data)} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('build/data', () => {
    // eslint-disable-next-line global-require
    const NEXT_DATA = require('build/data').default;

    render(NEXT_DATA);
  });
}

render(DATA);
