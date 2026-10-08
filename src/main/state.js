// What Dangle remembers between launches, and the one place that announces changes to it.
const { app } = require('electron');
const { EventEmitter } = require('events');
const path = require('path');
const fs = require('fs');

const DEFAULT_CAST = [
  { type: 'hero', right: 120, len: 240, scale: 1 },
  { type: 'monkey', right: 280, len: 170, scale: 1 },
  { type: 'bat', right: 440, len: 60, scale: 1 },
];

const state = {
  chars: DEFAULT_CAST, // [{ type, right, len, scale }]; right = distance of the rope from the right edge
  roam: true, // characters wander by themselves
  visible: true,
};

// Emits 'changed' after every update; the tray and the Dangle window redraw from it.
const events = new EventEmitter();
const file = () => path.join(app.getPath('userData'), 'state.json');

function load() {
  try {
    const saved = JSON.parse(fs.readFileSync(file(), 'utf8'));
    if (Array.isArray(saved.chars)) Object.assign(state, saved);
  } catch {
    // first run, or an unreadable file: keep the defaults
  }
}

// Applies a change, writes it to disk and tells everyone who shows it.
function update(patch = {}) {
  Object.assign(state, patch);
  fs.mkdirSync(path.dirname(file()), { recursive: true });
  fs.writeFileSync(file(), JSON.stringify(state, null, 2));
  events.emit('changed');
}

// A character type is "on" while at least one of it is hanging.
const isOn = (type) => state.chars.some((c) => c.type === type);

module.exports = { state, events, load, update, isOn };
