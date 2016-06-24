import ReactDOM from 'react-dom';

import 'styles/index.styl';
import routes from 'routes';
import data from 'build/data';

ReactDOM.render(routes(data), document.getElementById('root'));
