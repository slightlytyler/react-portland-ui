const curry = require('lodash').curry;

module.exports = curry((doc, key, value) => doc._data._c.set(key, value));
