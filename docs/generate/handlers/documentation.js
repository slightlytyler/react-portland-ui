const marked = require('marked');
const { getDocumentation, setDocAttribute } = require('../helpers');

const container = markup => `<div class="container">${markup}</div>`;

module.exports = file => doc => {
  const { attributes, body } = getDocumentation(file);

  Object.keys(attributes).forEach(key => setDocAttribute(doc, key, attributes[key]));

  setDocAttribute(doc, 'examples', container(marked(body)));
};
