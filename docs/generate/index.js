const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const filter = require('lodash').filter;
const docgen = require('react-docgen');

const defaultHandlers = docgen.handlers;
const customHandlers = require('./handlers');

const __out = path.join(__dirname, '../build/data.js');
const __src = './src/modules/**/*.js';

// Setup parse and write functions

const handler = file => [
  defaultHandlers.propTypeHandler,
  defaultHandlers.propDocBlockHandler,
  defaultHandlers.defaultPropsHandler,
  customHandlers.file(file),
  customHandlers.name(file),
  customHandlers.documentation(file),
];

const parse = file => docgen.parse(fs.readFileSync(file), undefined, handler(file));

const write = docData => {
  mkdirp(path.dirname(__out));
  fs.writeFile(__out, `export default ${JSON.stringify(docData, null, '\t')}`);
};

// Handle generation

const files = glob.sync(__src);

const docs = files.reduce((acc, file) => {
  try {
    return Object.assign({}, acc, { [file]: parse(file) });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = filter(docs, doc => doc.name && doc.module)

write(configuredDocs);
