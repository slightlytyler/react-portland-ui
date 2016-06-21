import ReactDOM from 'react-dom';

import DATA from 'build/data';

import 'styles/index.styl';
import routes from 'routes';

const render = data => ReactDOM.render(routes(data), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('build/data', () => {
    // eslint-disable-next-line global-require
    const NEXT_DATA = require('build/data').default;

    render(NEXT_DATA);
  });
}

render(DATA);
