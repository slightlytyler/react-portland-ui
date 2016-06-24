import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/index.styl';
import Routes from 'routes';
import data from 'build/data';

ReactDOM.render(<Routes data={data} />, document.getElementById('root'));
