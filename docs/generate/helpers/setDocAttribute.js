import { curry } from 'lodash';

export default curry((doc, key, value) => doc._data._c.set(key, value));
