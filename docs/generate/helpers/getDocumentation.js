const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

module.exports = file => {
  const dir = path.dirname(file);
  const documentationData = fs.readFileSync(path.join(dir, 'documentation.md'), 'utf8');

  return frontMatter(documentationData);
};
