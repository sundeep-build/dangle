// Bridge for the overlay window.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dangle', {
  // Resolves with { defs, chars: [{ type, right, len, scale }], roam }; defs is the character registry.
  init: () => ipcRenderer.invoke('overlay:init'),
  // Main asks for something: { op: 'add' | 'remove' | 'removeType' | 'type' | 'scale' | 'trick' | 'home' | 'clear' | 'roam', ... }.
  onCommand: (callback) => ipcRenderer.on('overlay:cmd', (_event, cmd) => callback(cmd)),
  // Where the characters are right now, so main knows which clicks belong to them.
  hit: (hit) => ipcRenderer.send('overlay:hit', hit),
  // The cast changed or moved; main keeps it for next launch.
  save: (chars) => ipcRenderer.send('overlay:save', chars),
  // Right-click on a character: { id, type, scale }.
  menu: (info) => ipcRenderer.send('overlay:menu', info),
});
