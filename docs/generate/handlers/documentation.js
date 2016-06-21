import marked from 'marked';
import { getDocumentation, setDocAttribute } from '../helpers';

const container = markup => `<div class="container">${markup}</div>`;

export default file => doc => {
  const { attributes, body } = getDocumentation(file);

  Object.keys(attributes).forEach(key => setDocAttribute(doc, key, attributes[key]));

  setDocAttribute(doc, 'examples', container(marked(body)));
};
