import { memoize, kebabCase } from 'lodash';

export const getModules = memoize(data => data.reduce((acc, component) => {
  const { module } = component;
  if (acc.indexOf(module) === -1) return [...acc, module];
  return acc;
}, []));

export const getComponents = memoize(data => getModules(data).reduce((acc, module) => [
  ...acc,
  ...data.filter(docs => docs.module === module),
], []));

export const getPackagesByModule = memoize((packages, module) => (
  packages.filter(p => p.module === module)
));

export const getPackageByName = memoize((packages, name) => (
  packages.find(p => kebabCase(p.name) === name)
));
