import path from 'path';
import glob from 'glob';
import { filter } from 'lodash';
import { handlers } from 'react-docgen';
import {
  parseFile,
  extractExamples,
  writeDocs,
  writeExamples,
} from './helpers'
import {
  file as fileHandler,
  name as nameHandler,
  documentation as documentationHandler,
} from './handlers';

const __src = './src/packages/**/*.js';
const __out = path.join(__dirname, '../build');
const __data_out = path.join(__out, 'data.js');
const examplesOutSelector = name => path.join(__out, `examples/${name}.js`);
const files = glob.sync(__src);

const handler = file => [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  fileHandler(file),
  nameHandler(file),
  documentationHandler(file),
];

const parsedDocs = files.reduce((acc, file) => {
  try {
    return Object.assign({}, acc, { [file]: parseFile(file, handler) });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = filter(parsedDocs, doc => doc.name && doc.module)

const { docs, examples } = extractExamples(configuredDocs);

writeDocs(docs, __data_out);

writeExamples(examples, examplesOutSelector);
