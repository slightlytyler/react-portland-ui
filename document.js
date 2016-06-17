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

  doc._data._c.set('config', config)
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

const handler = [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  configHandler,
];

const parse = path => docgen.parse(fs.readFileSync(path), undefined, handler)

const files = glob.sync('./src/modules/**/*.js');

const docs = files.reduce((acc, path) => {
  try {
    const result = parse(path);
    return Object.assign({}, acc, { [path]: result });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = _.filter(docs, doc => typeof doc.config === 'object')
console.log(configuredDocs);
fs.writeFile('docs/data.json', JSON.stringify(configuredDocs, null, '\t'));