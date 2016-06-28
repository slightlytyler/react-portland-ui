export default docs => ({
  docs,
  examples: docs.map(doc => ({ name: doc.name, body: doc.examples })),
});
