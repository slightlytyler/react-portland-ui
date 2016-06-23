import lunr from 'lunr';
import data from 'build/data';

function configIdx() {
  this.field('name', { boost: 30 });
  this.field('module', { boost: 20 });
  this.field('file', { boost: 10 });
  this.field('description');
}

const idx = lunr(configIdx);

data.forEach((doc, index) => idx.add({ ...doc, id: index }));

export default query => idx.search(query);
