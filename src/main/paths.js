// Where things live on disk, so no other module has to count "../".
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

module.exports = {
  asset: (name) => path.join(ROOT, 'assets', name),
  preload: (name) => path.join(ROOT, 'src', 'preload', `${name}.js`),
  page: (name) => path.join(ROOT, 'src', 'renderer', name, 'index.html'),
};
