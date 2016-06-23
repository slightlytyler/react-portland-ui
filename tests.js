const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());

// concatenates all tests and uses webpack to transpile into ES5, (cannot merge into karma.conf.js)
const context = require.context('./src', true, /.test.js$/);
context.keys().forEach(context);
