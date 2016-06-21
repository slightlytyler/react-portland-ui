import { getDocumentation, setDocAttribute } from '../helpers';

export default file => (doc, ast) => {
  const { attributes } = getDocumentation(file);
  const setDocName = setDocAttribute(doc, 'name');

  if (attributes.name) setDocName(attributes.name);
  else setDocName(ast.value.id.name);
};
