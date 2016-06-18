const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const docgen = require('react-docgen');
const handlers = docgen.handlers;
const recast = require('recast');
const types = recast.types.namedTypes;

const amendConfig = (doc, path) => {
  if (!types.ObjectExpression.check(path.node)) {
    return;
  }

  const config = _.reduce(path.get('properties').value, (acc, propertyPath) => (
    Object.assign(acc, { [propertyPath.key.name]: propertyPath.value.value })
  ), {});

  Object.keys(config).forEach(key => doc._data._c.set(key, config[key]));
};

const configHandler = (doc, path) => {
  var configPath = docgen.utils.getMemberValuePath(path, 'documentation');

  if (!configPath) {
    return;
  }

  configPath = docgen.utils.resolveToValue(configPath);

  if (!configPath) {
    return;
  }

  amendConfig(doc, configPath);
};

const fileHandler = file => doc => doc._data._c.set('file', file);

const handler = (file) => [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  fileHandler(file),
  configHandler,
];

const parse = file => docgen.parse(fs.readFileSync(file), undefined, handler(file))

const files = glob.sync('./src/modules/**/*.js');

const docs = files.reduce((acc, file) => {
  try {
    const result = parse(file);
    return Object.assign({}, acc, { [file]: result });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = _.filter(docs, doc => doc.name && doc.module)

fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(configuredDocs, null, '\t'));