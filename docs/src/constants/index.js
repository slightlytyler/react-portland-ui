export const modules = DOC_DATA.reduce((acc, component) => {
  const { module } = component;
  if (acc.indexOf(module) === -1) return [...acc, module];
  return acc;
}, []);

export const components = modules.reduce((acc, module) => [
  ...acc,
  ...DOC_DATA.filter(docs => docs.module === module),
], []);
