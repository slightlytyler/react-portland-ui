import fs from 'fs'
import path from 'path';
import mkdirp from 'mkdirp';

export default (docData, output) => {
  mkdirp(path.dirname(output));
  fs.writeFile(output, `module.exports = ${JSON.stringify(docData, null, '\t')}`);
};