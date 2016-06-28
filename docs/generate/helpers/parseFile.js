import fs from 'fs'
import { parse } from 'react-docgen';

export default (file, handler) => parse(fs.readFileSync(file), undefined, handler(file));
