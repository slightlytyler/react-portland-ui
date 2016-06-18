export const modules = DOC_DATA.reduce((acc, component) => {
  const { config: { module } } = component;
  if (acc.indexOf(module) === -1) return [...acc, module];
  return acc;
}, []);
