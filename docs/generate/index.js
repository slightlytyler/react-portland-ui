const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const lodash = require('lodash');
const { curry, filter } = lodash;
const docgen = require('react-docgen');
const handlers = docgen.handlers;
const frontMatter = require('front-matter');
const marked = require('marked');

const fileHandler = file => doc => setDocAttribute(doc, 'file', file);

const getDocumentation = file => {
  const dir = path.dirname(file);
  const documentationData = fs.readFileSync(path.join(dir, 'documentation.md'), 'utf8');

  return frontMatter(documentationData);
};

const setDocAttribute = curry((doc, key, value) => doc._data._c.set(key, value));

const nameHandler = file => (doc, ast) => {
  const { attributes } = getDocumentation(file);
  const setDocName = setDocAttribute(doc, 'name');

  if (attributes.name) setDocName(attributes.name);
  else setDocName(ast.value.id.name);
}

const container = markup => `<div class="container">${markup}</div>`;

const documentationHandler = file => doc => {
  const { attributes, body } = getDocumentation(file);

  Object.keys(attributes).forEach(key => setDocAttribute(doc, key, attributes[key]));

  setDocAttribute(doc, 'examples', container(marked(body)));
}

const handler = (file) => [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  fileHandler(file),
  nameHandler(file),
  documentationHandler(file),
];

const parse = file => docgen.parse(fs.readFileSync(file), undefined, handler(file));

const write = docData => {
  mkdirp(path.join(__dirname, '../build'));
  fs.writeFile(
    path.join(__dirname, '../build/data.js'),
    `export default ${JSON.stringify(docData, null, '\t')}`
  );
};

const files = glob.sync('./src/modules/**/*.js');

const docs = files.reduce((acc, file) => {
  try {
    const result = parse(file);
    return Object.assign({}, acc, { [file]: result });
  } catch(error) {
    return acc;
  }
}, {});

const configuredDocs = filter(docs, doc => doc.name && doc.module)

write(configuredDocs);
