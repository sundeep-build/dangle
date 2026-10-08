// Who is hanging: the actions the tray, the Dangle window and the right-click menu share.
const CHARACTERS = require('../characters');
const { state, update, isOn } = require('./state');
const overlay = require('./overlay');

function add(type) {
  if (!state.visible) overlay.setVisible(true);
  overlay.send({ op: 'add', type });
}

function setType(type, on) {
  if (!CHARACTERS[type] || on === isOn(type)) return;
  if (on) add(type);
  else overlay.send({ op: 'removeType', type });
}

function setAll(on) {
  if (on) Object.keys(CHARACTERS).forEach((type) => setType(type, true));
  else overlay.send({ op: 'clear' });
}

function setRoam(on) {
  overlay.send({ op: 'roam', on });
  update({ roam: on });
}

const gather = () => overlay.send({ op: 'home' });

module.exports = { add, setType, setAll, setRoam, gather };
