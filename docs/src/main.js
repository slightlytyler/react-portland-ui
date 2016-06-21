import ReactDOM from 'react-dom';

import data from 'build/data';

import 'styles/index.styl';
import routes from 'routes';

ReactDOM.render(routes(data), document.getElementById('root'));
