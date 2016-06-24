const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme());

// concatenates all tests and uses webpack to transpile into ES5, (cannot merge into karma.conf.js)
const context = require.context('./src', true, /.test.js$/);
context.keys().forEach(context);
