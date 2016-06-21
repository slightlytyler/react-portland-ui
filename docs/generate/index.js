import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import { filter } from 'lodash';
import { handlers, parse } from 'react-docgen';

import {
  file as fileHandler,
  name as nameHandler,
  documentation as documentationHandler,
} from './handlers';

const __out = path.join(__dirname, '../build/data.js');
const __src = './src/modules/**/*.js';

// Setup parse and write functions

const handler = file => [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  fileHandler(file),
  nameHandler(file),
  documentationHandler(file),
];

const parseFile = file => parse(fs.readFileSync(file), undefined, handler(file));

const writeDocs = docData => {
  mkdirp(path.dirname(__out));
  fs.writeFile(__out, `export default ${JSON.stringify(docData, null, '\t')}`);
};

// Handle generation

const files = glob.sync(__src);

const docs = files.reduce((acc, file) => {
  try {
    return Object.assign({}, acc, { [file]: parseFile(file) });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = filter(docs, doc => doc.name && doc.module)

writeDocs(configuredDocs);
