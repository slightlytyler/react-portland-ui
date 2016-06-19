import DATA from 'build/data';
export const modules = DATA.reduce((acc, component) => {
  const { module } = component;
  if (acc.indexOf(module) === -1) return [...acc, module];
  return acc;
}, []);

export const components = modules.reduce((acc, module) => [
  ...acc,
  ...DATA.filter(docs => docs.module === module),
], []);
