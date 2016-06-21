const { setDocAttribute } = require('../helpers');

module.exports = file => doc => setDocAttribute(doc, 'file', file);
