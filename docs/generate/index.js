const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const docgen = require('react-docgen');
const handlers = docgen.handlers;
const frontMatter = require('front-matter');
const marked = require('marked');

const fileHandler = file => doc => doc._data._c.set('file', file);

const contain = markup => `<div class="container">${markup}</div>`;

const documentationHandler = file => doc => {
  const dir = path.dirname(file);
  const documentationData = fs.readFileSync(path.join(dir, 'documentation.md'), 'utf8');
  const documentation = frontMatter(documentationData);
  const { attributes, body } = documentation;

  Object.keys(attributes).forEach(key => doc._data._c.set(key, attributes[key]));

  doc._data._c.set('examples', contain(marked(body)));
}

const handler = (file) => [
  handlers.propTypeHandler,
  handlers.propDocBlockHandler,
  handlers.defaultPropsHandler,
  fileHandler(file),
  documentationHandler(file),
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

fs.writeFile(path.join(__dirname, '../build/data.js'), `export default ${JSON.stringify(configuredDocs, null, '\t')}`);