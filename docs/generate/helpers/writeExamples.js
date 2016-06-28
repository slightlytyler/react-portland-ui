import fs from 'fs'
import path from 'path';
import mkdirp from 'mkdirp';
import jsx from 'react-jsx';

export default (examples, pathSelector) => {
  examples.forEach(e => {
    const output = pathSelector(e.name);
    mkdirp(path.dirname(output));
    fs.writeFile(
      output,
      `module.exports = function(React) { return ${jsx.server(e.body)} }`
    );
  });
};