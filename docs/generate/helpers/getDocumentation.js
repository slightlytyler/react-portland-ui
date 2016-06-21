import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

export default file => {
  const dir = path.dirname(file);
  const documentationData = fs.readFileSync(path.join(dir, 'documentation.md'), 'utf8');

  return frontMatter(documentationData);
};
